function stripWww(s) {
    const regExp = /^(https?:\/\/)?(www\.)?(.*)/;
    const regExpArr = regExp.exec(s);
    if (!regExpArr) return s;
    return `${regExpArr[1] ?? ""}${regExpArr[3]}`
}

export const cleanURL = (url ) => {
    // remove whitespaces and the fragment(#) part of the URL
    url = url.trim().split('#')[0];
    // remove www from the url
    return stripWww(url);
}

