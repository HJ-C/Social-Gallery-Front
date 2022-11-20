function UserInfo(){
    
        const layer_button = document.getElementById('layer_button');
        const layer = document.getElementById('layer');
    layer_button.addEventListener('click', function(e){
        layer.setAttribute('style', "display:flex")
    });

    layer.addEventListener("click", function(e){
        layer.setAttribute('style', "display:none")
    })

    
}

export default UserInfo;



// function UserInfo(){
//         window.onload = function(){
//             const layer_button = document.getElementById('layer_button');
//             const layer = document.getElementById('layer');
//         layer_button.addEventListener('click', function(e){
//             layer.setAttribute('style', "display:flex")
//         });
    
//         layer.addEventListener("click", function(e){
//             layer.setAttribute('style', "display:none")
//         })
//         }

    
//     return (
//         <>
//             <button id="layer_button">레이어 팝업</button>
//             <div className="layer" id="layer">
//                 <div className="layer_content">
//                     레이어
//                 </div>
//             </div>
//         </>
//     )
// }

// export default UserInfo;