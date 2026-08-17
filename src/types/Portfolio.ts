export type Presentation = {
    id: number,
    name: string,
    title: string,
    description: string,
    imgUrl: string
}

export type AboutMe = {
    id: number,
    title: string,
    description: string,
    bgImgUrl: string,
    buttonText: string,
    buttonUrl: string
}

export type Degree = {
    id: number,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    imgUrl: string
}

export type Skill = {
    id: number,
    name: string,
    description: string,
    level: string,
    imgUrl: string,
    category: string
}

export type Job = {
    id: number,
    name: string,
    position: string,
    description: string,
    startDate: Date,
    endDate: Date
}

export type Project = {
    id: number,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    url: string,
    imgUrl: string
}

export type Portfolio = {
    owner: string,
    presentation: Presentation,
    aboutMe: AboutMe,
    degrees: Degree[],
    skills: Skill[],
    experience: Job[],
    projects: Project[]
}