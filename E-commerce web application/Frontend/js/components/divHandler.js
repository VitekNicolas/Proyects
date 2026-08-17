const divMain = document.getElementById("divMain");

const cleanDivMain = () => {
  divMain.innerHTML="";
}

export const createContainer = (containerName) => {
    const div = document.createElement('div');
    div.id = containerName
    return div;
  }

export const appendContainersToDivMain = (...containers) => {
    cleanDivMain();
    containers.forEach(container => divMain.appendChild(container));
}
