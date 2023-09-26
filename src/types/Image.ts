type Image = {
    name: string,
    sourceId: string,
    sourceImageURL: string,
    imageLink: string,
    previewLink: string,
    imageWidth: number,
    imageHeight: number,
    likes: string[],
    owner: {
        username: string,
        profilePicture: string,
        userLink: string
    },
    provider: {
        name: string,
        URL: string,
        providerPicture: string,
    }
}

export default Image