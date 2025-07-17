export const updateLiStyle=()=>{
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => nav.classList.remove('active-nav-item'));
            this.classList.add('active-nav-item');
        });
    });
}