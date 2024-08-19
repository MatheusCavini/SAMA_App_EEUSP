import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { View, Text } from 'react-native';

const InformationPDF = ({ navigation }: { navigation: any }) => {
    const [pdfHtml, setPdfHtml] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const asset = Asset.fromModule(require('../../../assets/Info.pdf'));
                await asset.downloadAsync();

                const fileUri = `${FileSystem.cacheDirectory}${asset.hash}.pdf`;
                await FileSystem.copyAsync({
                    from: asset.localUri!,
                    to: fileUri
                });

                const base64PDF = await FileSystem.readAsStringAsync(fileUri, {
                    encoding: FileSystem.EncodingType.Base64
                });

                const html = `
                    <html>
                    <head>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>
                        <style>
                            body { margin: 0; padding: 0; display: flex; flex-direction: column; align-items: center; }
                            .pdf-page { margin-bottom: 10px; }
                        </style>
                    </head>
                    <body>
                        <div id="pdf-viewer"></div>
                        <script>
                            var pdfData = '${base64PDF}';
                            var pdfjsLib = window['pdfjs-dist/build/pdf'];
                            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

                            var loadingTask = pdfjsLib.getDocument({ data: atob(pdfData) });
                            loadingTask.promise.then(function(pdf) {
                                console.log('PDF loaded');
                                var viewer = document.getElementById('pdf-viewer');
                                for (var pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                                    pdf.getPage(pageNum).then(function(page) {
                                        var scale = 1.5;
                                        var viewport = page.getViewport({ scale: scale });

                                        var canvas = document.createElement('canvas');
                                        canvas.className = 'pdf-page';
                                        var context = canvas.getContext('2d');
                                        canvas.height = viewport.height;
                                        canvas.width = viewport.width;

                                        viewer.appendChild(canvas);

                                        var renderContext = {
                                            canvasContext: context,
                                            viewport: viewport
                                        };
                                        page.render(renderContext);
                                    });
                                }
                            });
                        </script>
                    </body>
                    </html>
                `;

                setPdfHtml(html);
            } catch (e:any) {
                setError(e.message);
            }
        };

        loadPdf();
    }, []);

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    if (!pdfHtml) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading PDF...</Text>
            </View>
        );
    }

    return (
        <WebView
            originWhitelist={['*']}
            source={{ html: pdfHtml }}
            style={{ flex: 1 }}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            allowFileAccessFromFileURLs={true}
        />
    );
};

export default InformationPDF;
