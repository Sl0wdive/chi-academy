export const getHeroes = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  return data.results;
};

export const getHeroById = async (id: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  return res.json();
};
