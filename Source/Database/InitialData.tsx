export const InsertActivities:string = `
    INSERT INTO Activity (Name, IsCreated, Active) VALUES 
    ('Identificação e análise dos processos de gestão de riscos', 0, 1), 
    ('Análise de resultados e acompanhamento da gestão de riscos no serviço', 0, 1),
    ('Ações de capacitação profissional em segurança do paciente', 0, 1),
    ('Comunicação, informação e documentação', 0, 1),
    ('Consequências de eventos adversos', 0, 1),
    ('Auditorias', 0, 1),
    ('Cultura de segurança positiva', 0, 1),
    ('Acordos de gestão', 0, 1)
`

export const InsertStatus:string = `
    INSERT INTO Status (ID, Name)  VALUES
    (1,'Pendente'),
    (2,'Agendado'),
    (3,'Atualizado')
`

export const InsertSections:string = `
    INSERT INTO Section (Name, Activity, IsCreated) VALUES
    ('Processos de gestão de riscos', 1, 0),
    ('Recursos', 1, 0),
    ('Estudo de frequência de ocorrência de EA', 1, 0),
    ('Análise de riscos', 1, 0),
    ('Reuniões clínicas', 1, 0),
    ('Resultados de ANÁLISE DA CAUSA RAIZ', 2, 0),
    ('Notificações: Comitê/Núcleo de segurança', 2, 0),
    ('Notificações: comitê de gestão', 2, 0),
    ('Anonimato das notificações', 2, 0),
    ('Acompanhamento da efetividade', 2, 0),
    ('Revisão da capacitação profissional', 3, 0),
    ('Integração de novos funcionários', 3, 0),
    ('Efetividade das ações educativas', 3, 0),
    ('Plano de comunicação ', 4, 0),
    ('Documentação', 4, 0),
    ('Informação a familiares', 5, 0),
    ('Informe de compensações a vítimas', 5, 0),
    ('Informe de apólices de seguros', 5, 0),
    ('Impacto em profissionais de saúde', 5, 0),
    ('Impacto em instituições de saúde', 5, 0),
    ('Revisão e planejamento do programa de auditorias internas e externas', 6, 0),
    ('Assegurar a promoção da cultura de segurança na organização',7, 0),
    ('Acordos de gestão',8, 0)
`

export const InsertPeriods:string = `
    INSERT INTO Periodicity (Period, AddDays) VALUES
    ('Bienal', 730),
    ('Anual', 365),
    ('Semestral', 180),
    ('Quadrimestral', 120),
    ('Trimestral', 90),
    ('Bimestral', 60),
    ('Mensal', 30),
    ('Quinzenal', 15),
    ('Semanal', 7)
`

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();


export const InsertTasks:string = `
    INSERT INTO Task (Name, Description, Periodicity, Activity, Section, Active, Status, NextAction, Note, IsCreated) VALUES
    ('Processos de gestão de riscos', 'Revisão e melhoria, se necessário, dos diferentes processos de gestão de riscos (identificação, análise, avaliação e tratamento)', 2, 1, 1, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Decisões baseadas em evidências', 'Aplicar o uso do melhor conhecimento disponível, evitando decisões preciptadas e pouco fundamentadas. Revisão de decisões sobre as medidas de segurança.', 5, 1, 1, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Circuitos de Mobilidade antiCOVID-19', 'Organização de rotas específicas para garantir movimentos de máxima segurança para pacientes e profissionais, tanto hospitalizados quanto em urgências, principalmente em períodos de crises sanitárias.', 5, 1, 1, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Reorganização das estruturas', 'Estabelecimento de áreas assistenciais "seguras" no hospital para pacientes que necessitem ser atendidos de forma presencial.', 5, 1, 1, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Alternativas às consultas tradicionais', 'Estabelecimento de modelos de consultas não presenciais de atenção continuada e resolução de problemas.', 5, 1, 1, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Designação de meios', 'Alocação de meios para implementar o sistema de gestão de riscos.', 2, 1, 2, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Cadeia de estoque de EPI', 'Gestão proativa do estoque de EPI.', 5, 1, 2, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Gestão do estoque de produtos sanitários', 'Gestão proativa de estoque de produtos sanitários de barreira para a transmissão de infecções, como aventais resistentes à líquidos.', 5, 1, 2, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Higiene das mãos', 'Gestão proativa do estoque de Solução hidroalcóolica. Reprocessamento de produtos sanitários ante rupturas de estoque e mercado. Fabricação própria de insumos como soluções antissépticas alcoólicas.', 5, 1, 2, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Estudo de frequência de ocorrência de EA', 'Reunião do comitê gestor para definir as datas do estudo para determinar a frequência de eventos adversos.', 2, 1, 3, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Pacientes mais vulneráveis ao EA', 'Identificação de perfis de pacientes com maior vulnerabilidade para sofrer evento adverso. Identificação de perfis de risco mais frequentes, mais graves e de maior impacto social.', 5, 1, 3, 1, 1, '${day}-${month}-${year}', '', 0 ),
      
    ('Análise de riscos', 'Comitê gestor dedica ao menos uma reunião a cada quadrimestre para analisar os riscos para a segurança dos pacientes (hospitalizações, urgências, centro cirúrgico ou atenção ambulatorial) a partir das fontes de informação (sistema de notificação de incidentes e EA) e compartilha as conclusões com as comissões assistenciais, qualidade, segurança e docência.', 4, 1, 4, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Uso medicação fora das indicações da bula', 'Estabelecer sinais de alerta no caso de medicação com utilização fora da indicação da bula, para evitar riscos ao paciente.', 5, 1, 4, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Uso de medicamento de alto risco', 'Monitorar os medicamentos de alto risco e os medicamentos potencialmente perigosos.', 5, 1, 4, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Identificação e revisão dos processos', 'Identificação e revisão dos processos próprios de cada unidade ou serviço em que se pretende implementar o serviço de gestão de riscos (análise do contexto). ', 2, 1, 4, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Mapas de risco', 'Estabelecer mapas de risco por serviços e unidades para evitar eventos adversos mais previsíveis. ', 5, 1, 4, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Eventos sentinela', 'Revisão de Eventos sentinela específicos do serviço.', 5, 1, 4, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Riscos de contágio por SARS-CoV-2', 'Revisão dos protocolos de atendimento clínicos de exames e equipamentos diagnósticos e terapêuticos adaptando seu uso ao nível de risco de contágio por SARS-CoV-2', 5, 1, 4, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Reuniões clínicas', 'Reunião clínica com a presença das lideranças e direção sobre a ocorrência de erros clínicos para analisar e evitar riscos no futuro.', 3, 1, 5, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Lições aprendidas com o COVID-19', 'Sessão/Reunião clínica em que se revisa a atuação frente a casos COVID-19 em função do conhecimento disponível em cada momento. ', 5, 1, 5, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Controle de EA durante crises sanitárias', 'Sessões/Reuniões de discussão para a revisão de falhas e erros ocorridos na abordagem de pacientes COVID-19 e não-COVID-19.', 5, 1, 5, 1, 1, '${day}-${month}-${year}', '', 0 ),



    ('Resultados ACR', 'Reunião do comitê gestor para conhecer e discutir os resultados da ACR.', 3, 2, 6, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Notificações: Comitê/Núcleo de Segurança do Paciente de segurança', 'Sessão do Núcleo de Segurança do Paciente/Comissão de Segurança que revisa os resultados do sistema de notificação. ', 3, 2, 7, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Incidentes sem dano', 'Revisão e atualização dos sistemas de notificação de incidentes sem dano e eventos adversos.', 2, 2, 7, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Notificações: comitê de gestão', 'Sessão do comitê gestor para revisar os resultados do sistema de notificação.', 3, 2, 8, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Incidentes sem dano', 'Revisão e atualização dos sistemas de notificação de incidentes sem dano e eventos adversos.', 2, 2, 8, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Acompanhamento da efetividade', 'Reunião do comitê gestor  para realizar um acompanhamento da efetividade das medidas que colocamos em funcionamento derivadas dos estudos realizados para determinar a frequência de EA. ', 3, 2, 9, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Anonimato das notificações', 'Supervisionar a anonimização dos dados no sistema de notificações. ', 5, 2, 9, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Medição da gestão de riscos', 'Implementação e revisão do sistema de medição da gestão de riscos (medidas qualitativas e quantitativas de: alcance de objetivos, eficácia de controles e programas de atuação).', 2, 2, 9, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Sessão clínica', 'Sessão clínica com a presença da equipe de gestão ou equipe de liderança sobre a ocorrência de erros clínicos para analise e prevenção de riscos no futuro. ', 3, 2, 10, 1, 1, '${day}-${month}-${year}', '', 0 ),
    


    ('Revisão da capacitação profissional do ano anterior', 'Revisão das acões e resultados do ano anterior do plano de capacitação profissional anual em segurança do paciente.', 2, 3, 11, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Revisão da formação dos residentes', 'Revisão do plano de formação dos residentes em segurança do paciente e revisão dos resultados do ano anterior.', 2, 3, 11, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Necessidades de capacitação', 'Identificação das necessidades de capacitação das pessoas e desenho das atualizações/projetos para dar respostas as mesmas.', 2, 3, 11, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Treinamento em risco biológico', 'Medidas no serviço de saúde para evitar contágios (pacientes e profissionais), uso adequado de EPI.', 5, 3, 11, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Integração de novos funcionários', 'Sessão de revisão de protocolos de segurança  pela Comissão de Segurança do Paciente com o objetivo de  assegurar  que os níveis de segurança oferecidos aos paciente não são afetados pela incorporação de novos funcionários (especialmente em determinados setores como UTI, sala de cirurgia, hospital dia).', 3, 3, 12, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Boas vindas aos residentes', 'Boas vindas aos residentes e folheto informativo sobre segurança do paciente no serviço, aprovado pela liderança.', 2, 3, 12, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Efetividade das ações educativas', 'Avaliação da efetividade das ações educativas realizadas na área de Segurança do Paciente.', 2, 3, 13, 1, 1, '${day}-${month}-${year}', '', 0 ),



    ('Plano de crise', 'Revisão anual de um plano de crise que define o que deve ser feito quando ocorre um EA com consequências graves em um ou mais pacientes.', 2, 4, 14, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Plano de comunicação', 'Estabelecimento e revisão de um plano de comunicação interna e externa sobre segurança do paciente.', 2, 4, 14, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Comunicação eficaz durante crises sanitárias', 'Configuração de um grupo de especialistas para garantir  comunicação interna e externa adequadas em tempos de crise.', 5, 4, 14, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Educação para a população', 'Plano de comunicação sobre como acessar os serviços, como contribuir com a segurança e evitar contágios por SARS-CoV-2.', 5, 4, 14, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Controle de documentos', 'Estabelecimento e revisão do procedimento de controle de documentos (aprovação, atualização, disponibilidade, acessibilidade, legibilidade,...).', 2, 4, 15, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Termos de Consentimento Livre e Esclarecido de COVID 19', 'Revisar os termos de consentimentos informados e modificar aqueles em que se deve ser incluiída a possibilidade de risco de contágio por SARS-CoV-2.', 5, 4, 15, 1, 1, '${day}-${month}-${year}', '', 0 ),



    ('Informação a familiares', 'Revisão anual do protocolo sobre o que, como, quando e quem informar a um paciente (ou seus familiares) que este sofreu um EA.', 2, 5, 16, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Informe de compensações a vítimas', 'Revisão do informe anual sobre compensações a pacientes vítimas de EA.', 2, 5, 17, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Informe de apólices de seguros', 'Revisão de informe anual de profissionais que requereram à apólice de seguro para cobrir indenizações.', 2, 5, 18, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Profissionais afetados', 'Avaliar a incidência de profissionais afetados pela participação em um EA para o paciente.', 2, 5, 19, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Segundas vitimas', 'Ações preventivas e de intervenção para abordar o fenômeno das segundas vítimas.', 2, 5, 19, 1, 1, '${day}-${month}-${year}', '', 0 ),

    ('Impacto econômico', 'Analisar o impacto econômico estimado dos profissionais da saúde que se tornarem segundas vítimas nos casos de EA.', 2, 5, 20, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Reputação do serviço', 'Analisar a reputação do serviço de saúde nos meios de comunicação quanto à gestão dos EA e suas consequências para os pacientes e profissionais.', 2, 5, 20, 1, 1, '${day}-${month}-${year}', '', 0 ),



    ('Planejamento de auditorias', 'Planejamento de um programa de auditorias internas e externas (definição de critérios, estabelecimento de um procedimento adequado).', 5, 6, 21, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Resultados das auditorias', 'Revisão dos resultados das auditorias internas e externas e planejamento de ações corretivas.', 5, 6, 21, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Listas de comprovação', 'Elaboração e aplicação sistemáticas de listas de comprovação (checklist) para assegurar a capacidade de resposta do serviço diante de um possível novo surto da pandemia de COVID-19 e as medidas adotadas para estabelecer um ambiente seguro no centro.', 5, 6, 21, 1, 1, '${day}-${month}-${year}', '', 0 ),



    ('Promover cultura de segurança', 'Definir e implementar ações concretas para promover a cultura de segurança nos profissionais do serviço de saúde. ', 2, 7, 22, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Avaliar a cultura de segurança', 'Avaliar o cumprimento das ações de promoção da cultura de segurança.', 2, 7, 22, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Plano de contingência', 'Estabelecer um plano de contingência escrito sobre recursos e níveis assistenciais que possam ser revisados com periodicidade.', 5, 7, 22, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Prioridades durantes crises sanitárias', 'Priorizar objetivos e atuações em relação aos riscos para se tomar decisões efetivas.', 5, 7, 22, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Não existe risco 0 (zero)', 'Considerar a falibilidade das medidas de barreira. Todas as barreiras têm falhas.', 5, 7, 22, 1, 1, '${day}-${month}-${year}', '', 0 ),



    ('Indicadores de segurança do paciente', 'Revisão dos indicadores centrados na segurança do paciente.', 2, 8, 23, 1, 1, '${day}-${month}-${year}', '', 0 ),
    ('Cumprimento dos acordos de gestão', 'Inclusão de indicadores e cumprimento nos acordos de gestão do serviço.', 2, 8, 23, 1, 1, '${day}-${month}-${year}', '', 0 )




    
`