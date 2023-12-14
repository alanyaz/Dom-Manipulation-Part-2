const mainEl = document.querySelector("main");
const topMenuEl = document.querySelector("#top-menu");
const subMenuEl = document.querySelector("#sub-menu");

subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

topMenuEl.style.cssText = 'height: 100%; background-color: var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog',
    href: '#',
    subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ],
  },
  {
    text: 'orders',
    href: '#',
    subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ],
  },
  {
    text: 'account',
    href: '#',
    subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ],
  },
];

function createMenuLinks(links, container) {
    links.forEach(link => {
      const linkElement = document.createElement("a");
      linkElement.href = link.href;
      linkElement.textContent = link.text;
  
      container.appendChild(linkElement);
  
      if (link.subLinks && link.subLinks.length > 0) {
        const subMenu = document.createElement("div");
        subMenu.classList.add('submenu');
        
        
  
        createMenuLinks(link.subLinks, subMenu);
      }
    });
  }
    

createMenuLinks(menuLinks, topMenuEl);

const topMenuLinks = topMenuEl.querySelectorAll('a');

topMenuEl.addEventListener('click', handleMenuClick);

function handleMenuClick(event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') return;

  console.log(event.target.textContent.toLowerCase());
	
	mainEl.innerHTML = '<h1>'+event.target.textContent+'</h1>';
  topMenuLinks.forEach(link => link.classList.toggle('active', link === event.target));

  const subLinks = menuLinks.find(link => link.text.toLowerCase() === event.target.textContent.toLowerCase())?.subLinks;

  if (subLinks) {
    buildSubmenu(subLinks);
  } else {
    subMenuEl.style.top = '0';
    subMenuEl.classList.remove('active');
  }
}

function createSubLinkElement(subLink) {
  const subLinkElement = document.createElement('a');
  subLinkElement.href = subLink.href;
  subLinkElement.textContent = subLink.text;
  return subLinkElement;
}

function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = '';

  const isSubMenuActive = subMenuEl.classList.contains('active');

  if (!isSubMenuActive) {
    subLinks.forEach(subLink => {
      const subLinkElement = createSubLinkElement(subLink);
      subMenuEl.appendChild(subLinkElement);
    });

    const topMenuRect = topMenuEl.getBoundingClientRect();
    subMenuEl.style.top = `${topMenuRect.bottom}px`;

    subMenuEl.style.width = '100%';

    subMenuEl.addEventListener('click', handleSubmenuClick);
  } else {
    subMenuEl.style.top = '0';
  }
}

function handleSubmenuClick(event) {
  event.preventDefault();
	
	if (event.target.tagName !== 'A') return;
	
  console.log(event.target.textContent.toLowerCase());
	
	mainEl.innerHTML = '<h1>'+event.target.textContent+'</h1>';
	
  subMenuEl.style.top = '0';
  subMenuEl.classList.remove('active');
}
