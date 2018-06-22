document.onload = () => {
  const btnEl = document.getElementById("suggest-edit");
  let beforeEdit = null;
  btnEl.onclick = (e) => {
    e.preventDefault();
    if (beforeEdit === null) {
      btnEl.classList.add("editing");
      document.body.contentEditable = true;
      beforeEdit = document.body.innerHTML;
    } else {
      afterEdit = document.body.innerHTML;
      document.body.contentEditable = false;
      btnEl.classList.remove("editing");
      const patch = JsDiff.createPatch(window.location, beforeEdit, afterEdit, "", "");
      beforeEdit = null;
      fetch("https://hooks.zapier.com/hooks/catch/2257982/wddkks/", {
        method: "POST",
        body: JSON.stringify({
          url: window.location,
          diff: patch
        })
      });
    }
  };
}