"use client"

import { useState } from "react"
import { Moon, Sun, Github, Twitter, Linkedin, ExternalLink, Mail } from "lucide-react"
import Image from "next/image"

interface Idata {
  id: number
  url: string
  description: string
  title: string
  linkImage: string
  status: string
}

interface ProfileProps {
  posts: Idata[]
}

export default function Profile({posts}: ProfileProps) {
  const [isDark, setIsDark] = useState(true)

  const year = new Date().getFullYear()

  const skills = [
    "Design",
    "UX",
    "Frontend",
    "Backend",
    "DevOps",
    "Mobile",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Electron.js",
    "Firebase",
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div>
              <Image
                src="https://avatars.githubusercontent.com/u/25287877?s=96&v=4"
                alt="Foto de perfil de Matheus Gomes"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Matheus Gomes</h1>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Developer Fullstack
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full transition-colors ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                : "bg-white hover:bg-gray-100 text-gray-700 shadow-md"
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Skills Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isDark
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* About Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">About me</h2>
              <div className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white shadow-sm"}`}>
                <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {`🚀 Enthusiast of the best web and mobile development technologies. But addicted to the world of TypeScript and JavaScript. I love creating innovative solutions that make a difference in people's lives.`}
                </p>
                <p className={`text-lg leading-relaxed mt-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Always learning new technologies and sharing knowledge with the developer community. Passionate about
                  clean code, best practices, and creating amazing user experiences.
                </p>
              </div>
            </section>

            {/* Connect Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Connect with Me</h2>
              <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{`Let's stay in touch!`}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://twitter.com/t_h_e_u"
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700 text-blue-400"
                      : "bg-white hover:bg-gray-50 text-blue-600 shadow-sm"
                  }`}
                >
                  <Twitter size={20} />
                  <span>Twitter</span>
                </a>
                <a
                  href="https://github.com/t-heu"
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                  }`}
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/matheusgbatista/"
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700 text-blue-400"
                      : "bg-white hover:bg-gray-50 text-blue-600 shadow-sm"
                  }`}
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="#"
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700 text-green-400"
                      : "bg-white hover:bg-gray-50 text-green-600 shadow-sm"
                  }`}
                >
                  <Mail size={20} />
                  <span>Email</span>
                </a>
              </div>
            </section>
          </div>

          {/* Right Column - Projects */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">My Projects</h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Check out some of my recent work</p>

            {/* Container com scroll limitado */}
            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {posts.map((project, index) => (
                <div
                  key={index}
                  className={`group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                    isDark ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <Image
                        src={project.linkImage || "/placeholder.svg"}
                        alt={project.title}
                        width={600} // ajuste conforme necessário
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          project.status === "Live"
                            ? "bg-green-500 text-white"
                            : project.status === "Beta"
                              ? "bg-yellow-500 text-white"
                              : "bg-blue-500 text-white"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <a href={project.url} className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30">
                      <ExternalLink size={16} className="text-white" />
                    </a>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {project.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <a
                        href="#"
                        className={`text-sm font-medium transition-colors ${
                          isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        View Details
                      </a>
                      <a
                        href={project.url}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-700"
                        }`}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Projects Button */}
            <button
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              View All Projects →
            </button>

            {/* Contact Card - mantém o mesmo */}
            <div
              className={`p-6 rounded-xl ${
                isDark ? "bg-gradient-to-r from-blue-900 to-purple-900" : "bg-gradient-to-r from-blue-500 to-purple-600"
              } text-white`}
            >
              <h3 className="text-xl font-semibold mb-2">{`Let's Work Together`}</h3>
              <p className="text-sm opacity-90 mb-4">
                {`Have a project in mind? Let's discuss how we can bring your ideas to life.`}
              </p>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-20 py-8 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        <div className="container mx-auto px-6 text-center">
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            © {year} Matheus Gomes. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
