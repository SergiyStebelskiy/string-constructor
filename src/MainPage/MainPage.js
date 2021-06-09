import { useState } from "react"
import s from "./MainPage.module.scss"
import StringForm from "./components/StringForm/StringForm"
import { generateHash, getRandomNum } from "./helpers"
import { Button } from "@material-ui/core"
import { Draggable, Droppable } from "react-drag-and-drop"
import classNames from "classnames"
const MainPage = () => {
  const [data, setData] = useState(null)
  const [randomParts, setRandomParts] = useState([])
  const [defaultRandomPartsLength, setDefaultRandomPartsLength] = useState(null)
  const [successParts, setSuccessParts] = useState([])
  const [errorParts, setErrorParts] = useState([])
  const [isDropped, setIsDropped] = useState(false)
  const handleResetString = () => {
    setData(null)
    setRandomParts([])
    setSuccessParts([])
    setErrorParts([])
    setDefaultRandomPartsLength(null)
  }
  const handleAddString = ({ name, percent }) => {
    data && handleResetString()
    const splittedName = name.split(" ")
    const hiddenPartsCount = Math.floor((splittedName.length * percent) / 100)
    setData(splittedName)
    for (let i = 0; i < hiddenPartsCount; i++) {
      setRandomParts(parts => [
        ...parts,
        getRandomNum(0, splittedName.length - 1, parts)
      ])
    }
    setDefaultRandomPartsLength(hiddenPartsCount)
  }

  const onDragEnd = (wordId, dropId) => {
    setIsDropped(true)
    if (wordId === dropId) {
      setRandomParts(randomParts.filter(e => e !== dropId))
      setSuccessParts(successParts => [...successParts, dropId])
    } else {
      !errorParts.includes(dropId) &&
        setErrorParts(errorParts => [...errorParts, dropId])
    }
  }
  return (
    <div className={s.mainWrap}>
      <StringForm onSubmit={handleAddString} onReset={handleResetString} />
      {data && (
        <>
          <div className={s.parts}>
            {data.map((part, index) =>
              randomParts.includes(index) ? (
                <Droppable
                  types={["word"]}
                  onDrop={({ word }) => onDragEnd(Number(word), index)}
                  key={index}
                >
                  <span
                    className={classNames(s.hashPart, {
                      [s.error]: errorParts.includes(index)
                    })}
                  >
                    {generateHash(part.length)}
                  </span>
                </Droppable>
              ) : (
                <span
                  className={classNames(s.part, {
                    [s.success]: successParts.includes(index)
                  })}
                  key={index}
                >
                  {part}
                </span>
              )
            )}
          </div>
          {defaultRandomPartsLength !== successParts.length &&
            defaultRandomPartsLength !== errorParts.length && (
              <div className={s.words}>
                {randomParts.map((partIdx, index) => (
                  <Draggable data={partIdx} type='word' key={index}>
                    <Button variant='contained' className={s.word}>
                      {data[partIdx]}
                    </Button>
                  </Draggable>
                ))}
              </div>
            )}
          {defaultRandomPartsLength === successParts.length && isDropped && (
            <span className={s.successMessage}>
              Congratulations, you won :)
            </span>
          )}
          {defaultRandomPartsLength === errorParts.length && isDropped && (
            <span className={s.errorMessage}>
              Sorry you lost, don't be discouraged :)
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default MainPage
