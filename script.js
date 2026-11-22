
// const modalLinks = document.querySelectorAll('a[href^="#modal"]');

// modalLinks.forEach(function (modalLink, index) {

//   const modalId = modalLink.getAttribute('href');
  

//   modalLink.addEventListener('click', function (event) {
    

//     const modal = document.querySelector(modalId);

//     if(modal){
  
//       const closeBtn = modal.querySelector('.dialog__close');
//       event.preventDefault();
//       modal.showModal(); 
      

//       closeBtn.addEventListener('click', function (event) {
//         modal.close();
//       });

//       document.querySelectorAll('dialog').forEach(function (dialog) {
//         dialog.addEventListener('click', function (event) {
//           const r = dialog.getBoundingClientRect();
//           if (event.clientX < r.left || event.clientX > r.right ||
//               event.clientY < r.top  || event.clientY > r.bottom) {
//             dialog.close();
//           }
//         });
//       });
      

//       document.addEventListener('click', function (event) {
        
//         const dialogEl = event.target.tagName;
//         const dialogElId = event.target.getAttribute('id');
//         if(dialogEl == 'DIALOG'){

//           modal.close();
//         }
//       }, false);
      

//     } else {
//       console.log('Modal doesn\'t exist');
//     }
//   });
// });

document.querySelectorAll('a[href^="#modal"]').forEach(function (modalLink) {
  const modalId = modalLink.getAttribute('href');

  modalLink.addEventListener('click', function (event) {
    const modal = document.querySelector(modalId);

    if (!modal) {
      console.log("Modal doesn't exist:", modalId);
      return;
    }

    event.preventDefault();
    modal.showModal();
  });
});


document.querySelectorAll('dialog').forEach(function (dialog) {

  // ✕ button
  const closeBtn = dialog.querySelector('.dialog__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      dialog.close();
    });
  }

  dialog.addEventListener('click', function (event) {
    const r = dialog.getBoundingClientRect();
    const outsideBox =
      event.clientX < r.left || event.clientX > r.right ||
      event.clientY < r.top  || event.clientY > r.bottom;

    if (outsideBox) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', function () {
    const anyOpen = document.querySelector('dialog[open]') !== null;
    document.documentElement.classList.toggle('modal-open', anyOpen);
  });
});


Array.from(document.querySelectorAll('.screenshots-img-div img')).forEach(img => {
  img.addEventListener("click", function() {
    this.parentElement.classList.toggle('enabled')
  })
})



// --- Opening modals ---

document.querySelectorAll('a[href^="#modal"]').forEach(function (modalLink) {
  const modalId = modalLink.getAttribute('href');

  modalLink.addEventListener('click', function (event) {
    const modal = document.querySelector(modalId);
    if (!modal) {
      console.log("Modal doesn't exist:", modalId);
      return;
    }
    event.preventDefault();

    modal.querySelectorAll('iframe').forEach(function (iframe) {
      if (iframe.dataset.originalSrc) {
        iframe.src = iframe.dataset.originalSrc;
      }
    });

    modal.showModal();
  });
});


// --- Closing modals ---

document.querySelectorAll('dialog').forEach(function (dialog) {

  const closeBtn = dialog.querySelector('.dialog__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      dialog.close();
    });
  }

  dialog.addEventListener('click', function (event) {
    const r = dialog.getBoundingClientRect();
    const outsideBox =
      event.clientX < r.left || event.clientX > r.right ||
      event.clientY < r.top  || event.clientY > r.bottom;
    if (outsideBox) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', function () {


    dialog.querySelectorAll('iframe').forEach(function (iframe) {
      if (iframe.src && iframe.src !== 'about:blank') {
        iframe.dataset.originalSrc = iframe.src;
        iframe.src = 'about:blank';
      }
    });

    const anyOpen = document.querySelector('dialog[open]') !== null;
    document.documentElement.classList.toggle('modal-open', anyOpen);
  });
});