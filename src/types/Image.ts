type Image = {
    name: string,
    sorceId: string,
    sourceImageURL: string,
    imageLink: string,
    previewLink: string,
    imageWidth: number,
    imageHeight: number,
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