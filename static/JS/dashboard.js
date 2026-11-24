
function setupProductFilter({
      buttonSelector,
      contentSelector,
      dataAttr,
      activeClass = "active",
      defaultFilterId = null,
    }) {
      const productFilterBtn = document.querySelectorAll(buttonSelector);
      const productContent = document.querySelectorAll(contentSelector);

      productFilterBtn.forEach(filter => {
        filter.addEventListener("click", function (e) {
          e.preventDefault();
          const productFilter = this.getAttribute(dataAttr);

          productContent.forEach(content => content.classList.remove(activeClass));
          productFilterBtn.forEach(btn => btn.classList.remove(activeClass));

          const targetContent = document.getElementById(productFilter);
          if (targetContent) targetContent.classList.add(activeClass);

          this.classList.add(activeClass);
        });
      });

      if (defaultFilterId) {
        const defaultBtn = Array.from(productFilterBtn).find(btn => btn.getAttribute(dataAttr) === defaultFilterId);
        if (defaultBtn) defaultBtn.click();
      }
    }


      document.addEventListener('DOMContentLoaded', () => {
      const sidebar = document.querySelector('.sidebar');
      const menuToggle = document.getElementById('menu-toggle');
      const darkModeToggle = document.getElementById('darkmode-toggle');
      const darkIcon = darkModeToggle.querySelector('i');

      // Sidebar toggle
      menuToggle.addEventListener('click', () => {
        const icon = menuToggle.querySelector('i');
        if (window.innerWidth <= 768) {
          sidebar.classList.toggle('open');
        } else {
          sidebar.classList.toggle('collapsed');
        }
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-arrow-right');
      });

      // Dark mode toggle
      darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkIcon.classList.toggle('fa-moon');
        darkIcon.classList.toggle('fa-sun');
      });

        setupProductFilter({
        buttonSelector: '.accordion-btn[data-section], .accordion-content a',
        contentSelector: '.content-section',
        dataAttr: 'data-section',
        activeClass: 'active',
        defaultFilterId: 'dashboard',
      });
    });