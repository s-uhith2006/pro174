AFRAME.registerComponent("city", {

createModel:function (model) {
    var barcodeValue=model.barcode_value;
    var modelUrl=model.model_url;
    var modelName=model.model_name;

    var scene=document.querySelector("a-scene");

    var marker=document.createElement("a-marker");

    marker.setAttribute("id",`marker-${modelName}`);
    marker.setAttribute("type","barcode");
    marker.setAttribute("modelName","model_name");
    marker.setAttribute("value","barcodeValue");
    marker.setAttribute("id",`marker-${modelName}`);
    marker.setAttribute("markerHandler", {});
    scene.appendChild(marker);

    
    if (barcodeValue === 0) {
        var modelEl=document.createElement("a-entity");
        modelEl.setAttribute("id",`${modelName}`);
        modelEl.setAttribute("geometry",{
            primitive:"box",
            width:model.width,
            height:model.height
        });
        modelEl.setAttribute("position",model.position);
        modelEl.setAttribute("rotation",model.rotation);
        modelEl.setAttribute("material",{
            color:model.color
        });
        marker.appendChild(modelEl);

    }
    else{
        var modelEl=document.createElement("a-entity");
        modelEl.setAttribute("id",`${modelName}`);
        modelEl.setAttribute("gltf-model",`url(${modelUrl})`);
        modelEl.setAttribute("scale",model.scale);
        modelEl.setAttribute("position",model.position);
        modelEl.setAttribute("rotation",model.rotation);
        marker.appendChild(modelEl);
    }
    
},
    getDistance:function (elA,elB) {
        return elA.object3D.position.distanceTo(elB.object3D.position);
    },
    getModelGeometry:function (models,modelName) {
        var barcodes=Object.keys(models);
        for(var barcodes of barcodes){
            if (models[barcodes].model_name===modelName) {
                return{
                    position:models[barcode]["placement_position"],
                    rotation:models[barcode]["placement_rotation"],
                    scale:models[barcode]["placement_scale"],
                    model_url:models[barcode]["model_url"]
                };
            }
        }
    }


});
