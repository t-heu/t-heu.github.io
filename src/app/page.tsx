"use client";

import Profile from "@/components/ui/profile"
import axios from 'axios';
import {useEffect, useState} from 'react';

interface RepoData {
  id: number;
  name: string;
  description: string;
  homepage: string;
  svn_url: string;
  default_branch: string;
  topics: string[];
}

interface Post {
  id: number;
  title: string;
  linkImage: string;
  description: string;
  url: string;
}

export default function Home() {
  const [posts, setPosts] = useState([] as any);

  useEffect(() => {
    const fetchProjects = async () => {
      const staticProjects = [
        {
          id: 4,
          title: "IMC",
          linkImage: "./imc.png",
          description: "Calculate IMC",
          url: "https://t-heu.github.io/statics/imc/",
          status: 'LIVE'
        },
        {
          id: 5,
          title: "Forca HTML",
          linkImage: "./forca.png",
          description: "Game forca",
          url: "https://t-heu.github.io/statics/forca/",
          status: 'LIVE'
        },
        {
          id: 6,
          title: "Tic Tac Toe",
          linkImage: "./tictactoe.png",
          description: "Game Tic Tac Toe",
          url: "https://t-heu.github.io/statics/tictactoe/",
          status: 'LIVE'
        },
        {
          id: 9,
          title: "Memodates",
          linkImage: "https://raw.githubusercontent.com/t-heu/memodates/master/docs/preview.gif",
          description: "🎉 memorize the most important dates of your life. (DISCONTINUED)",
          url: "https://github.com/t-heu/memodates",
          status: 'LIVE'
        },
      ];

      try {
        const urlInitial = "https://raw.githubusercontent.com/t-heu/";
        const apiUrl = "https://api.github.com/users/t-heu/repos";

        const response = await axios.get<RepoData[]>(apiUrl);
        const filteredProjects: Post[] = response.data
          .filter(repo => repo.topics.includes("theu"))
          .map(repo => {
            const branch = repo.default_branch;
            const imagePath = branch === "main" ? "/main/docs/preview.png" : "/master/docs/preview.png";

            return {
              id: repo.id,
              title: repo.name,
              linkImage: `${urlInitial}${repo.name}${imagePath}`,
              description: repo.description,
              url: repo.homepage || repo.svn_url,
              status: 'LIVE'
            };
          });

        setPosts([...filteredProjects, ...staticProjects]);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    fetchProjects();
  }, []);
  
  return (
    <Profile posts={posts} />
  )
}
