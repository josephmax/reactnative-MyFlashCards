import { StyleSheet } from 'react-native'
import { white , gray, blue, inputWidth, cardHeight, smallFontSize, subtitleFontSize, titleFontSize, btnFontSize } from './consts'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: blue,
    justifyContent: 'center'
  },
  listWrapper: {
    flex: 1
  },
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: cardHeight
  },
  cardTitle: {
    fontSize: titleFontSize,
    color: white
  },
  cardCounts: {
    fontSize: subtitleFontSize,
    color:gray
  },
  pageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hintText: {
    fontSize: titleFontSize,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10
  },
  button: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: btnFontSize,
    color: white
  },
  loading: {
    flex: 1
  },
  detailWrapper: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: titleFontSize,
    paddingBottom: 20,
    color: white
  },
  counts: {
    fontSize: subtitleFontSize,
    color:gray
  },
  textInput: {
    fontSize: subtitleFontSize,
    height: 50,
    width: inputWidth,
    borderRadius: 8,
    margin: 15,
    padding: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: gray
  },
  progressText: {
    fontSize: smallFontSize,
    marginTop: 15
  },
  scoreText: {
    fontSize: subtitleFontSize
  }
})
