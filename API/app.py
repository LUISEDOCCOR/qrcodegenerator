from flask import Flask, jsonify, send_file, request
from qrCode import QRCode

app = Flask(__name__)


@app.route('/getqrcode', methods=['POST'])
def generate_qr():
    global error
    try:
        data = request.json["data"]
        error = False
    except:
        error = True

    if error or len(data) == 0:   
        return jsonify({'error': 'Missing data'})
    else:
        qr = QRCode(data)
        img = qr.generate_qr()
        return send_file(img.name, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, port=5000)