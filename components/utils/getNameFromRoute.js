const getNameFromRoute = (name) => {
  if (name === "Home") {
    return "Home"
  } else if (name === "Search") {
    return "Search"
  } else if (name === "Chat" || name === "ChatHome") {
    return "Messages"
  } else if (name === "Profil") {
    return "Profil"
  }
}

export default getNameFromRoute