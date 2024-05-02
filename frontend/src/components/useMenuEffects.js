import { useEffect, useState } from 'react';

const useMenuEffects = () => {
  const [logoSize, setLogoSize] = useState("normal");

  useEffect(() => {
    const activeLink = (e) => {
      const list = document.querySelectorAll(".navigation li");
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      e.target.closest("li").classList.add("hovered");
    };

    const listItems = document.querySelectorAll(".navigation li");
    listItems.forEach((item) => {
      item.addEventListener("mouseover", activeLink);
    });

    const toggleMenu = () => {
      const navigation = document.querySelector(".navigation");
      const main = document.querySelector(".main");
      navigation.classList.toggle("active");
      main.classList.toggle("active");
      setLogoSize(logoSize === "normal" ? "small" : "normal");
    };

    const toggleButton = document.querySelector(".toggle");
    toggleButton.addEventListener("click", toggleMenu);

    return () => {
      listItems.forEach((item) => {
        item.removeEventListener("mouseover", activeLink);
      });
      toggleButton.removeEventListener("click", toggleMenu);
    };
  }, [logoSize]);

  return logoSize;
};

export default useMenuEffects;
