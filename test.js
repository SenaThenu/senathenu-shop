function isImageFile(filename) {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
    const ext = filename.slice(filename.indexOf("."));
    return imageExtensions.includes(ext);
}

console.log(isImageFile("whatever.png"));
