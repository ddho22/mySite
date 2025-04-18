console.log('IT’S ALIVE!');



function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
//   );

// currentLink?.classList.add('current');

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'Resume/', title: 'Resume' },
    { url: 'https://github.com/ddho22', title: 'Github' },
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // next step: create link and add it to nav
    const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/"                  // Local server
    : "/mySite/";         // GitHub Pages repo name

    url = !url.startsWith('http') ? BASE_PATH + url : url;

    // Create link and add it to nav
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  };
  if (a.host !== location.host) {
    a.target = "_blank";
  };
};

document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
          Theme:
          <select>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="light dark">Automatic</option>
          </select>
      </label>`
  );

let select = document.querySelector("label.color-scheme");
  if ("colorScheme" in localStorage) {
    select.value = localStorage.colorScheme;
    select.firstElementChild.value = localStorage.colorScheme;
    
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
  }

  select.addEventListener('input', function (event) {

    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);

    localStorage.colorScheme = event.target.value;
  });

