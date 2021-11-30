import wpCall from "../../../../services/WpServerCall";

export const GetImage = async () => {
  let url = await wpCall().get("/sliders/v1/sliders");

  const resp = await fetch(url);
  const { data } = await resp.json();
  const datos = data.map(({ image }) => {
    return {
      image,
    };
  });
  return;
};
//export default gerGIfs;
