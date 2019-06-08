AFRAME.registerComponent('mobile', {
    init: function () {

        if(AFRAME.utils.device.isMobile() )
        {
            //相机
            var entityEl = document.createElement('a-camera');
            entityEl.setAttribute("position",{x:-16, y: 0.5, z: 16});
            entityEl.setAttribute('wasd-controls-enabled',true);
            var scene = document.querySelector('a-scene');
            scene.appendChild(entityEl);
        }
        else
        {
            var scene = document.querySelector('a-scene');
            //相机
            var entityEl = document.createElement('a-entity');


            //entityEl.setAttribute('id', 'something');

            entityEl.setAttribute('universal-controls', {
              movementControls: 'checkpoint',
            });

            entityEl.setAttribute('checkpoint-controls', {
              mode: 'animate',
            });


            entityEl.setAttribute('position', {x:-16, y: 2, z: 16});
            entityEl.setAttribute('camera','camera');


            //相机内部cursor
            var innerEl = document.createElement('a-entity');
            innerEl.setAttribute('cursor', {maxDistance: 30});
            innerEl.setAttribute('position', {x:0, y: 0, z: -1});

            innerEl.setAttribute('geometry', {
                primitive: 'ring',
                radiusInner: 0.02,
                radiusOuter: 0.03
            });

            innerEl.setAttribute('material', {
                color: '#CCC',
                shader: 'flat'
            });

            /* *** */
            entityEl.appendChild(innerEl);

            scene.appendChild(entityEl);


            /* *** CHECKPOINTS, 用于跳动改变位置 */

            const spotHeight = -0.5;
            const teleportSpots = [
                //画廊部分
                {x: -16, y: spotHeight, z: 16},
                {x: -14, y: spotHeight, z: 12},
                {x: -18, y: spotHeight, z: 12},
                {x: -18, y: spotHeight, z: 4},
                {x: -16, y: spotHeight, z: 2.5},

                //门口部分
                {x: -12, y: spotHeight, z: 4},
                {x: -9, y: spotHeight, z: 4},

                //雕塑部分
                {x: -9, y: spotHeight, z: -0.5},
                {x: -9, y: spotHeight, z: -3},
                {x: -9, y: spotHeight, z: -5.5},

                //大厅靠窗左部分
                {x: -6, y: spotHeight, z: -5.5},
                {x: -6, y: spotHeight, z: -9.5},
                {x: -3, y: spotHeight, z: -9.5},
                {x: -1, y: spotHeight, z: -9.5},
                {x: 1, y: spotHeight, z: -9.5},
                {x: 5, y: spotHeight, z: -9.5},

                //大厅正前方
                {x: 6.5, y: spotHeight, z: -5.5},
                {x: 6.5, y: spotHeight, z: -2.5},
                {x: 6.5, y: spotHeight, z: 0.5},
                {x: 6.5, y: spotHeight, z: 3.5},
                
                //大厅右方
                {x: 5, y: spotHeight, z: 6.5},
                {x: 2.5, y: spotHeight, z: 6.5},
                {x: 0, y: spotHeight, z: 6.5},
                {x: -2.5, y: spotHeight, z: 6.5},
                {x: -5, y: spotHeight, z: 6.5},
                {x: -7.5, y: spotHeight, z: 6.5},
            ];


            var checkPointsContainer = document.createElement('a-entity'),
                checkPointEl,
                teleportPosition,
                checkpointColor = '#FFFF00';

            for(var k=0; k < teleportSpots.length; k++){
                teleportPosition = teleportSpots[k];
                checkPointEl = document.createElement('a-cylinder');
                checkPointEl.setAttribute('checkpoint','checkpoint');
                checkPointEl.setAttribute('radius','.25');
                checkPointEl.setAttribute('height','.1');
                checkPointEl.setAttribute('position',teleportPosition);
                checkPointEl.setAttribute('color', checkpointColor);


                checkPointsContainer.appendChild(checkPointEl);
            }


            scene.appendChild(checkPointsContainer);

            /* --- CHECKPOINTS */

        }

    },

    update: function(){

    },

    tick: function(){



    },

    remove: function(){

    }
});

