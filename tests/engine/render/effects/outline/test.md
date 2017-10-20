# Engine Render Outline Effect

### Preconditions
Interface is running, logged in the 'Welcome' or 'Dev-Welcome' domain at the initial position with avatar in third person view.

### Steps

#### Step 1
- Run the 'debugOutline.js' script located in the 'hifi/scripts/developer/utilities/render' folder.
- Expected: ![](./init.jpg)

#### Step 2
- Enable the 'Hover select' checkbox, move the mouse cursor over the rug on the floor to the right and hover over it for 1 second. The rug should be surrounded by an orange outline.
- Expected: ![](./firsthover.jpg)

#### Step 3
- Enable the 'Add selection' checkbox, move the mouse cursor over all three visible rugs and hover for 1 second in turn over them to select them.
- Expected: ![](./threerugs.jpg)

#### Step 4
- Quickly move cursor to 'Hover select' checkbox and disable it to freeze the outlined objects (If another object is selected in the process you can uncheck 'Add selection' to reset selection and redo step 3). Change the 'Width' slider to approximately 4.
- Expected: ![](./width4.jpg)

#### Step 5
- Enable the 'Glow' checkbox.
- Expected: ![](./glow.jpg)

#### Step 6
- Set the 'Red', 'Green' and 'Blue' sliders in the 'Color' group box to respectively the values 0, 1 and 0.5
- Expected: ![](./greenglow.jpg)

#### Step 7
- Set the 'Unoccluded' and 'Occluded' sliders in the 'Fill Opacity' group box to respectively the values 0.1, 0.5
- Expected: ![](./fillwithglow.jpg)

#### Step 8
- Disable the 'Glow' checkbox.
- Expected: ![](./fillwithoutglow.jpg)


 