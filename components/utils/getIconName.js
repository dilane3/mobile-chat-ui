const getIconName = (name, active) => {
  console.log(name)
  if (name === "Home") {
    return active ? "home":"home-outline"
  } else if (name === "Search") {
    return "search-outline"
  } else if (name === "Chat" || name === "ChatHome") {
    return active ? "chatbubble":"chatbubble-outline"
  } else if (name === "Profil") {
    return active ? "person":"person-outline"
  }
}

export default getIconName