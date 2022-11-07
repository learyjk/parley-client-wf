(() => {
  // index.ts
  var init = async () => {
    console.log("init called");
    const targets = document.querySelectorAll("[parley-target]");
    console.log({ targets });
    const form = document.querySelector("form");
    if (!form)
      return;
    const getData = async (num) => {
      console.log("getData for num:", num);
      try {
        const response = await fetch(
          `https://parley-api-2gajsirgta-uc.a.run.app/${num}`
        );
        if (response.status === 404) {
          alert(`No records found for DOT Number ${num}`);
          return null;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log({ error });
        return null;
      }
    };
    const updateUI = (data) => {
      targets.forEach((target) => {
        target.textContent = data[String(target.getAttribute("parley-target"))];
      });
    };
    const formSubmit = async (event) => {
      console.log("form submit");
      event.preventDefault();
      const dotNumber = form.querySelector('[parley-form="dot-number"]')?.value;
      const data = await getData(dotNumber);
      console.log({ data });
      if (!data) {
        console.log("error getting carrier data!");
      } else {
        updateUI(data);
      }
    };
    form.addEventListener("submit", formSubmit);
  };
  document.addEventListener("DOMContentLoaded", init);
})();
//# sourceMappingURL=index.js.map
