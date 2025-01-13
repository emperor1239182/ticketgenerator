const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('fileElem');
    const gallery = document.getElementById('gallery');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when item is dragged over
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        [...files].forEach(previewFile);
    }

    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const upload = document.getElementById('upload');
            const img = document.createElement('img');
            img.src = reader.result;
            gallery.removeChild(upload);
            gallery.appendChild(img);
            img.style.width = '30px';
            img.style.height = '30px';
        };
    }
    
 const submit = document.getElementById("submit");
submit.addEventListener("click", handleForm);

function handleForm(e) {
  e.preventDefault(); 
  const form = document.forms["ticket"]; 
  const email = form["email"].value.trim(); 
  const information = document.getElementById("information");
  const x = document.getElementById("info");
  const emailAddress = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    information.style.display = "block";
    x.innerHTML = "Please enter a valid email address";
    emailAddress.style.borderColor = " red";

  } else {
    information.style.display = "none";
    x.innerHTML = "";
    emailAddress.style.borderColor = "";
}
}
