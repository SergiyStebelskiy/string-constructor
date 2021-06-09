export const generateHash = strLength => "#".repeat(strLength)

export const getRandomNum = (min, max, nums) => {
  let result = Math.floor(Math.random() * (max - min + 1)) + min
  if (nums.includes(result)) {
    result = getRandomNum(min, max, nums)
  }
  return result
}
