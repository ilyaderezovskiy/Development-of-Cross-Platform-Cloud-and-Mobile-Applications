import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputContainer: {
        width: '80%'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonSignOut: {
        backgroundColor: '#0782F9',
        width: '30%',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        position: 'fixed',
        bottom: 20,
        marginRight: 20,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
    tableItem: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        maxHeight: 250,
        maxWidth: 250,
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    title: {
      fontSize: 32,
    },
    image: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        maxHeight: 250,
        maxWidth: 250,
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    searchInput: {
        type: "text",
        class: "input",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    icon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
  });
  
  export default styles 