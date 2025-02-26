# 0.0.0.3版本事项
* 主要特点是拖拽条和vditor都是实现了和主界面的解耦，如果需要修改，请到对应的.js文件中操作，路径在`./frontend/src`下

* 注意与原有版本不同的地方还有新建了`./frontend/src/style`文件夹用于贮存.css 文件，其中`vditor.css`是正常加载vditor的关键，同时原有在src文件夹下的`styles.css`也迁移至该文件夹，对应`test-hook.jsx`中引入的路径也做出了相应修改

* 如果是通过github下载，需要在终端打开 `./frontend`并`npm install`。且react-grid-layout当前版本存在两个漏洞，需要下载完成后手动修改，先找到`./frontend/node_modules/react-grid-layout`：

     1. 找到`build/GridItem.js`第205行处：

          ```js
          // top = (0, _calculateUtils.clamp)(top - containerPadding[1], 0, bottomBoundary);
          top = (0, _calculateUtils.clamp)(top, 0, bottomBoundary);
          const colWidth = (0, _calculateUtils.calcGridColWidth)(positionParams);
          const rightBoundary = containerWidth - (0, _calculateUtils.calcGridItemWHPx)(w, colWidth, margin[0]);
          // left = (0, _calculateUtils.clamp)(left - containerPadding[0], 0, rightBoundary);
          left = (0, _calculateUtils.clamp)(left, 0, rightBoundary);
          ```

        原文中包含上面注释掉的这两行，请将两行注释掉并换成上面块中的`top=`和`left=`

     2. 找到`utils.js`，把524到538行替换为：
          ```js
          if (!firstCollision) {
                log(`Doing reverse collision on ${itemToMove.i} up to [${fakeItem.x},${fakeItem.y}].`);
                return moveElement(layout, itemToMove, compactH ? fakeItem.x : undefined, compactV ? fakeItem.y : undefined, isUserAction, preventCollision, compactType, cols);
              } else if (collisionNorth && compactV) {
                const itemToMoveVerticalCenter = itemToMove.y + (itemToMove.h / 2);
                const roundedItemToMoveVerticalCenter = Math.floor(itemToMoveVerticalCenter) === 0 ? Math.ceil(itemToMoveVerticalCenter) : Math.floor(itemToMoveVerticalCenter);
                const isCollidingItemPastMidpoint = collidesWith.y >= roundedItemToMoveVerticalCenter;
                return moveElement(
                  layout, 
                  itemToMove, 
                  undefined, 
                  isCollidingItemPastMidpoint? collidesWith.y - 1 : collidesWith.y + 1,// collidesWith.y + 1, 
                  isUserAction, 
                  preventCollision, 
                  compactType, 
                  cols
                );
              } else if (collisionNorth && compactType == null) {
                collidesWith.y = itemToMove.y;
                itemToMove.y = itemToMove.y + itemToMove.h;
                return layout;
              } else if (collisionWest && compactH) {
                const itemToMoveHorizontalCenter = itemToMove.x + (itemToMove.w / 2);
                const roundedItemToMoveHorizontalCenter = Math.floor(itemToMoveHorizontalCenter) === 0 ? Math.ceil(itemToMoveHorizontalCenter) : Math.floor(itemToMoveHorizontalCenter);
                const isCollidingItemPastMidpoint = collidesWith.x >= roundedItemToMoveHorizontalCenter;
                return moveElement(
                  layout, 
                  itemToMove,  // 改为移动itemToMove，而不是collidesWith
                  isCollidingItemPastMidpoint ? collidesWith.x - 1 : collidesWith.x + 1,  // 根据中心点位置决定放在左侧还是右侧
                  undefined, 
                  isUserAction, 
                  preventCollision, 
                  compactType, 
                  cols
                );
              }
          ```

          

