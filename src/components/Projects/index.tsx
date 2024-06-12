import React, { useContext, useState, useEffect } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import ProjectsData, { Project } from '../../projectsdata';

import {
    ContainerProjects,
    SubContainerProjects,
    SubTitle,
    ButtonSeeMore,
    TextSeeMore,
    ContainerAllProjects,
    Project as ProjectComponent,
    ContainerTitle,
    SubContainerTitle,
    TitleProject,
    Description,
    Tools,
    LanguageLogo,
} from './styles';

import Media from 'react-media';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiExternalLink } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";

// Importando as imagens das logos das linguagens existentes
import javascriptLogo from '../../assets/javascript-logo.png';
import typescriptLogo from '../../assets/typescript-logo.png';
import pythonLogo from '../../assets/python-logo.png';
import phpLogo from '../../assets/php-logo.png';
import htmlLogo from '../../assets/html-logo.png';
import cssLogo from '../../assets/css-logo.png';

interface Props {
    toggleTheme(): void;
}

const languageLogos: { [key: string]: string } = {
    JavaScript: javascriptLogo,
    TypeScript: typescriptLogo,
    Python: pythonLogo,
    PHP: phpLogo,
    HTML: htmlLogo,
    CSS: cssLogo,
    // Adicione outras linguagens e logos conforme necessário
};

const Projects: React.FC<Props> = ({ toggleTheme }) => {
    const { colors, title } = useContext(ThemeContext);
    AOS.init();
    const [controller, setController] = useState(false);
    const [repos, setRepos] = useState<Project[]>([]);

    useEffect(() => {
        async function fetchRepos() {
            const username = 'GabrielMendessDev'; // Substitua pelo seu nome de usuário do GitHub
            const url = `https://api.github.com/users/${username}/repos`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erro ao buscar repositórios');

                const data = await response.json();
                const repos: Project[] = data.map((repo: any) => ({
                    id: repo.id,
                    title: repo.name,
                    description: repo.description || 'Sem descrição',
                    tool: repo.language || 'Linguagem não especificada',
                    github: repo.html_url,
                    link: `https://${username}.github.io/${repo.name}`,
                }));
                setRepos(repos);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRepos();
    }, []);

    function seeMore() {
        setController(!controller);
    }

    let teste;
    if (controller) {
        teste = Infinity;
    } else {
        teste = 3;
    }

    const allProjects = [...ProjectsData, ...repos];

    return (
        <ContainerProjects id="projetos">
            <SubContainerProjects>
                <SubTitle>
                    Projetos pessoais
                </SubTitle>

                <ButtonSeeMore onClick={seeMore}>
                    <TextSeeMore>{controller ? "Ver menos" : "Ver mais"}</TextSeeMore>
                </ButtonSeeMore>
            </SubContainerProjects>

            <ContainerAllProjects>
                {allProjects.slice(0, teste).map((item) => {
                    const { id, title, description, tool, link, github } = item;
                    return (
                        <ProjectComponent key={id} data-aos="zoom-in">
                            <ContainerTitle>
                                <TitleProject>{title}</TitleProject>
                                <SubContainerTitle>
                                    <a target="blank" href={github}><AiFillGithub color={colors.text} size={25} /></a>
                                    <a target="blank" href={link}><FiExternalLink color={colors.text} size={25} /></a>
                                </SubContainerTitle>
                            </ContainerTitle>

                            <Description>{description}</Description>
                            <Tools>
                                {tool}
                                {tool && languageLogos[tool] && (
                                    <LanguageLogo src={languageLogos[tool]} alt={`${tool} logo`} />
                                )}
                            </Tools>
                        </ProjectComponent>
                    );
                })}
            </ContainerAllProjects>
        </ContainerProjects>
    );
}

export default Projects;
