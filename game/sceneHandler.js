let switchingScene = false;
function sceneHandler(){
    if(player.position.y + player.height + player.velocity.y <= canvas.height - canvas.height && !switchingScene){
        switch(currentScene){
            case scene1: 
                currentScene = scene2
                playFade(music23)
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                
                }, 100);
                console.log(currentScene)
                break
            case scene2: 
                currentScene = scene3
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene3: 
                currentScene = scene4
                stopFade(music23)
                playFade(music4)
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene4: 
                currentScene = scene5
                stopFade(music4)
                playFade(music5)
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene5: 
                currentScene = scene6
                stopFade(music5)
                gravity = 0.43
                player.position.y = canvas.height
                player.velocity.y /= 1.6
                player.velocity.x /= 1.3
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene6:
                gravity = 0.7
                player.position.x = 100
                player.position.y = 400
                currentScene = scene1
                endGame();
        }
    }
}

// if(!switchingScene){
//     if(this.position.y + this.height + this.velocity.y >= canvas.height){
//         if(currentScene === scene1){
//             if(player.isGrounded === false){
//                 playAudioOnce('landSfx')
//                 this.isGrounded = true;
//             }
//             this.velocity.y = 0;
//             this.velocity.x = 0;
//         } else{
//             switch(currentScene){
//                 case scene6: 
//                     currentScene = scene5
//                     playFade(music5)
//                     gravity = 0.7
//                     player.position.y = 0
//                     switchingScene = true;
//                     setTimeout(() => { switchingScene = false;
//                     }, 10);
//                     console.log(currentScene)
//                     break
//                 case scene5:
//                     currentScene = scene4
//                     player.position.y = 0
//                     stopFade(music5)
//                     playFade(music4)
//                     switchingScene = true;
//                     setTimeout(() => { switchingScene = false;
                        
//                     }, 10);
//                     console.log(currentScene)
//                     break
//                 case scene4: 
//                     currentScene = scene3
//                     //music4.pause()
//                     stopFade(music4)
//                     playFade(music23)
//                     player.position.y = 0
//                     switchingScene = true;
//                     setTimeout(() => { switchingScene = false;
                        
//                     }, 10);
//                     console.log(currentScene)
//                     break
//                 case scene3: 
//                     currentScene = scene2
//                     player.position.y = 0
//                     switchingScene = true;
//                     setTimeout(() => { switchingScene = false;
                        
//                     }, 10);
//                     console.log(currentScene)
//                     break
//                 case scene2: 
//                     currentScene = scene1
//                     stopFade(music23)
//                     player.position.y = 0
//                     switchingScene = true;
//                     setTimeout(() => { switchingScene = false;
                        
//                     }, 10);
//                     console.log(currentScene)
//                     break
//             }
//         }
//     } else {
//         if(player.velocity.y <= 15){  
//             this.velocity.y += gravity;}
//         this.isGrounded = false;
//     }
//  }