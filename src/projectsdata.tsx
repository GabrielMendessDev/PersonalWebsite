import podcast from './assets/mock/podcast.png';

export interface Project {
    id: number;
    img: string;
    title: string;
    description: string;
    tool: string;
    github: string;
    link: string;
}

const ProjectsData: Project[] = [
    {
        id: 1,
        img: podcast,
        title: "RPP - Extensão Podcast Informatizando",
        description: "TCC(Técnico de Informática, IFRN) - Projeto desenvolvido com o intuito de promover a democracia virtual acerca de temas da atualidade",
        tool: "React · Firebase",
        github: "https://github.com/GabrielMendessDev/Projeto-RPP-IFRN-Extensao-Podcast-Informatizando",
        link: "https://github.com/GabrielMendessDev/Projeto-RPP-IFRN-Extensao-Podcast-Informatizando",
    },
];

export default ProjectsData;
