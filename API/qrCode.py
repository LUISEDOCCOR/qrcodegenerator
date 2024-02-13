import qrcode
import tempfile

class QRCode:
    def __init__(self, data):
        self.data = data
        self.qr = qrcode.QRCode(version=1, box_size=10, border=4)

    def generate_qr(self):
        self.qr.add_data(self.data)
        self.qr.make(fit=True)
        img = self.qr.make_image(fill="black", back_color="white")
        temp = tempfile.NamedTemporaryFile(delete=False)
        img.save(temp, "PNG")
        return temp 