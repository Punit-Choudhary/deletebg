from flask import Flask, request, render_template, send_file
from PIL import Image
from rembg import remove
from io import BytesIO

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'Please upload a file', 400

        userFile = request.files['file']
        if userFile.filename == '':
            return 'Please upload a file', 400
        
        if userFile:
            userImg = Image.open(userFile.stream)
            # post-process-mask for better results
            outputImg = remove(userImg, post_process_mask=True)
            img_io = BytesIO()
            outputImg.save(img_io, 'PNG')
            img_io.seek(0)

            return send_file(img_io, mimetype='image/png', as_attachment=True, download_name=f"{userFile.filename.split('.')[0]}_deletebg.png")
    return render_template('home.html')


if __name__ == "__main__":
    app.run(debug=True)