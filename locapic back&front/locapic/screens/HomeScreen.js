import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground, AsyncStorage } from 'react-native';

import {Button, Input, Text} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';



function HomeScreen({ navigation, onSubmitPseudo, pseudoStore}) {

    const [pseudo, setPseudo] = useState('');

    var isDisabled = false;

    // Récupérer le pseudo au chargement du composant :
    useEffect(() => {  

    const pseudoData = async () => {
      AsyncStorage.getItem("pseudo", 
        function(error, data){
          setPseudo(data)
          console.log('data',data);
          // envoie le pseudo dans le store
          onSubmitPseudo(data); 
          
        })
    };
    pseudoData();
 
   

    }, []);

    

    var alreadyPseudo;
   if (pseudoStore) {
   var alreadyPseudo = <Text h4 style={{marginBottom:40, color:'white'}}>Welcome Back {pseudoStore}</Text>
   } else {
    var alreadyPseudo = <Input   
    containerStyle = {{marginBottom: 25, width: '70%'}}
    inputStyle={{marginLeft: 10}}
    placeholder='John'
    leftIcon={
        <Icon
        name='user'
        size={24}
        color="#111224"
        />
    }
    onChangeText={(val) => setPseudo(val)}
/>
   }
    

    return (
    <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>

          
        {alreadyPseudo}

        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#111224"
                />
            }

            title="Go to Map"
            type="solid"
            // enregistrer le pseudo dans le local storage.
            onPress={() => {onSubmitPseudo(pseudo); AsyncStorage.setItem("pseudo", pseudo); navigation.navigate('Map')}}
        />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function mapStateToProps(state) {  

  return { pseudoStore: state.pseudo }                                                 
}


function mapDispatchToProps(dispatch) {
    return {
      onSubmitPseudo: function(pseudo) { 
        dispatch( {type: 'savePseudo', pseudo: pseudo }) 
        console.log('onSubmit', pseudo)
      }
    }
  }
  
  export default connect(
      mapStateToProps, 
      mapDispatchToProps
  )(HomeScreen);