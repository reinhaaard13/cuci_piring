
export default function getRandomColor() {
  const colorChoices = [
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
    "teal",
    "cyan",
  ]

  const randomIndex = Math.floor(Math.random() * colorChoices.length)

  return colorChoices[randomIndex]
}
