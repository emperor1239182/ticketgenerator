const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('fileElem');
    const gallery = document.getElementById('gallery');
    const topic = document.getElementById("topic");
    const emailedTicket = document.getElementById('emailed-ticket');
    const idname = document.getElementById('name');
    const git = document.getElementById('gitusername');
    const user = document.getElementById('username');
    const userImage = document.getElementById('user-image');
    const uniqueid = document.getElementById('identity');
    const ticket = document.getElementById('ticket-card');
    let uploadedImageSrc = ""; 
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
            uploadedImageSrc = reader.result;
            gallery.removeChild(upload);
            gallery.appendChild(img);
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.borderRadius = '4px';
            const button = document.createElement('div');
            const remove = document.createElement('button');
            remove.innerHTML = 'Remove';
            const change = document.createElement('button');
            change.innerHTML = 'Change';
            button.appendChild(change);
            button.appendChild(remove);
            button.children[0].style.fontSize = '10px';
            button.children[1].style.fontSize = '10px';
            gallery.appendChild(button);
            remove.addEventListener('click', () => {
                gallery.removeChild(img);
                gallery.removeChild(button);
                gallery.appendChild(upload);
            });
            change.addEventListener('click', () => {
                fileInput.value = "";
                fileInput.click();
            });
            if(!upload){
            document.getElementById('drop').style.display = 'none';
            }
            else{
                document.getElementById('drop').style.display = 'block';
            }
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
const allFieldsFilled = Array.from(form.querySelectorAll('input')).every(input => input.value.trim() !== "");

if (allFieldsFilled) {
    displayTicket();
    
} else {
  alert('Please fill in all fields.');
}
    
}

function displayTicket(){ 
    const form = document.forms["ticket"]; 
    if(ticket.style.display === "none"){
        form.style.display = "none";
        ticket.style.display = "block";
    const email = form["email"].value.trim(); 
    const fullName = document.getElementById("full-name").value;
    topic.innerHTML = `Congrats, ${fullName}! <br/> Your ticket is ready.`;
    emailedTicket.innerHTML = `<div style="margin-top: 20px">We've emailed your ticket to <span style="color:coral"> ${email}</span> and will send update in the run up of the event</div>`;
    idname.innerHTML = fullName; 
    user.innerHTML = ` ${git.value}`;

    if(uploadedImageSrc){
   console.log(userImage.setAttribute("href", uploadedImageSrc));
    };
    uniqueid.innerHTML = "#" + Math.floor(Math.random() * 100000);
    }else{
        ticket.style.display = "none";
    }
    
}
