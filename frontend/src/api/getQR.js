const api_url = "https://luisedoccor.pythonanywhere.com/getqrcode"

export const getqrcode = async (data) => {
    const response = await fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: data}),
    })
    const img = await response.blob()
    const img_url = URL.createObjectURL(img)
    return img_url
}