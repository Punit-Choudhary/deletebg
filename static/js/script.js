let dropZone = document.getElementById("dropzone");
let fileInput = document.getElementById("fileInput");
let uploadForm = document.getElementById("uploadForm");

dropZone.addEventListener("click", function (e) {
    if (e.target !== fileInput) {
        fileInput.click();
    }
});

fileInput.addEventListener("change", function (e) {
    if (fileInput.files.length > 0) {
        uploadForm.submit();
        uploadForm.reset();
    }
    e.stopPropagation();
});

dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.add("dragover");
});

dropZone.addEventListener("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove("dragover");
});

dropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove("dragover");

    let file = e.dataTransfer.files[0];
    console.log(file);
    fileInput.files = e.dataTransfer.files;
    uploadForm.submit();
    uploadForm.reset();
});