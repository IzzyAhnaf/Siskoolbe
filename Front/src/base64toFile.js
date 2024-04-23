export default function base64ToFile(base64Data, filename) {
    if(!base64Data) {
        return null;
    }
    const base64WithoutMetadata = base64Data.split(';base64,').pop();

    const byteCharacters = atob(base64WithoutMetadata);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Ganti 'image/jpeg' dengan tipe gambar yang sesuai

    const file = new File([blob], filename, { type: blob.type });
    return file;
}