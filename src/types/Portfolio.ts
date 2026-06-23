type presentation = {
    id: number,
    name: string,
    title: string,
    description: string,
    imgUrl: string
}

type aboutMe = {
    id: number,
    title: string,
    description: string,
    bgImgUrl: string,
    buttonText: string,
    buttonUrl: string
}

type degree = {
    id: number,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    imgUrl: string
}

type skill = {
    id: number,
    name: string,
    description: string,
    level: string,
    imgUrl: string,
    category: string
}

type job = {
    id: number,
    name: string,
    position: string,
    description: string,
    startDate: Date,
    endDate: Date
}

export type Portfolio = {
    owner: string,
    presentation: presentation,
    aboutMe: aboutMe,
    degrees: degree[],
    skills: skill[],
    experience: job[]
}