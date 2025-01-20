"use client";
// @ts-ignore next/no-img-element: off
import Link from "next/link"
//import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios';
import {useEffect, useState} from 'react';

interface Idata {
  id: number
  url: string
  describe: string
  nameProject: string
  linkImage: string
}

export default function Home() {
  const [posts, setPosts] = useState([] as any);

  function useDarkMode() {
    if (typeof window !== "undefined") {
      // Client-side-only code
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  useDarkMode();

  useEffect(() => {
    const arr: any = [];
    const url_initial = 'https://raw.githubusercontent.com/t-heu/';
    const url_end = '/main/docs/preview.png';
    const apiUrl = 'https://api.github.com/users/t-heu/repos'
    axios.get(apiUrl)
      .then(response => {
        response.data.map((dataArray: any) => {
          if (dataArray.topics.includes('theu')) {
            arr.push({
              id: dataArray.id,
              nameProject: dataArray.name,
              linkImage: url_initial + dataArray.name + url_end,
              describe: dataArray.description,
              url: dataArray.homepage ? dataArray.homepage : dataArray.svn_url
            });   
          }
        });

        arr.push({
          id: 4,
          nameProject: "IMC",
          linkImage: "./imc.png",
          describe: "Calculate IMC",
          url: "https://t-heu.github.io/statics/imc/"
        }, {
          id: 5,
          nameProject: "Forca HTML",
          linkImage: "./forca.png",
          describe: "Game forca",
          url: "https://t-heu.github.io/statics/forca/"
        }, {
          id: 6,
          nameProject: "Tic Tac Toe",
          linkImage: "./tictactoe.png",
          describe: "Game Tic Tac Toe",
          url: "https://t-heu.github.io/statics/tictactoe/"
        }, {
          id: 9,
          nameProject: "Memodates",
          linkImage: "https://raw.githubusercontent.com/t-heu/memodates/master/docs/preview.gif",
          describe: "🎉 memorize the most important dates of your life. (DISCONTINUED)",
          url: "https://github.com/t-heu/memodates"
        });
        setPosts(arr);
      })
      .catch(error => {
        console.error('Erro ao obter os dados:', error);
      });
  },[])
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-4 px-4 text-center md:gap-10 lg:gap-16 lg:px-6 xl:grid-cols-3 xl:gap-20">
        <div className="flex flex-col items-center gap-4 xl:order-2 xl:col-start-2 xl:row-start-1">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Matheus Gomes</h1>
            <p className="text-gray-500 dark:text-gray-400">Developer Fullstack</p>
          </div>
          <div className="rounded-xl overflow-hidden border">
            <img
              alt="Photo"
              height="200"
              src='https://media.licdn.com/dms/image/C4E03AQGBBLGk0pmS6g/profile-displayphoto-shrink_200_200/0/1571613202660?e=2147483647&v=beta&t=Jf21CKX3Q9k_o9s1emMuZ_m2pRBqdkt9scc8wJdoyMw'
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
          </div>
          <div className="space-y-4 text-left md:space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">About me</h2>
              <p className="text-gray-500 md:w-[600px] dark:text-gray-400">
              💫 Enthusiast of the best web and mobile development technologies. But addicted to the world of typescript and javascript.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 xl:col-start-3 xl:row-start-1 xl:justify-self-end">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">My Projects</h2>
            <p className="text-gray-500 dark:text-gray-400">Check out some of my recent work</p>
          </div>
          <div className="grid gap-4 md:gap-6 justify-center">
            <ScrollArea className="h-72 w-100 rounded-md border">
              {posts.map((data: Idata) => (
                <Link key={data.id} href={data.url}>
                  <div className="flex flex-col gap-1 py-3">
                    <img
                      alt={data.nameProject}
                      className="rounded-lg object-cover"
                      height="200"
                      
                      src={data.linkImage}
                      style={{
                        aspectRatio: "400/200",
                        objectFit: "cover",
                      }}
                      width="auto"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-semibold">{data.nameProject}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data.describe}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </ScrollArea>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Skills</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">Design</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">UX</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">Frontend</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">Backend</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">DevOps</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">Mobile</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12">
        <div className="container grid max-w-3xl items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6 lg:max-w-5xl lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Connect with Me</h2>
              <p className="text-gray-500 dark:text-gray-400">{`Let's stay in touch!`}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 text-sm font-medium shadow-sm gap-2 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="https://twitter.com/t_h_e_u"
              >
                <TwitterIcon className="w-4 h-4" />
                Twitter
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 text-sm font-medium shadow-sm gap-2 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="https://github.com/t-heu"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 text-sm font-medium shadow-sm gap-2 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="https://www.linkedin.com/in/matheusgbatista/"
              >
                <LinkedinIcon className="w-4 h-4" />
                Linkedin
              </Link>
            </div>
          </div>
      </div>
    </section>
  )
}

function LinkedinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
