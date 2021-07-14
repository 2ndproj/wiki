function newFile(msg) {
	var filename = prompt(msg, "Untitled", "Name Your Shape");
	if (filename != null) {
		motn_file = new File("~/Desktop/" + filename + ".motn");
		if (motn_file.exists) {
			motn_file = newFile("There is already a file by that name on your Desktop.  Please try another name.");
		}
		return motn_file;
	}
	else {
		return null;
	}		
}

mySelection = app.activeDocument.selection;
 if (mySelection instanceof Array) {
 	if (mySelection.length > 1) {
 		alert("Multiple Selection\nYou have more than one item selected.  Only the first object will be exported.");
 	}
 	else {
		theObject = mySelection[0];
		if (theObject.typename != "PathItem") {
			if (theObject.typename == "GroupItem") {
				alert("Type Error\nThe selected item is a group.  This script can only export path items.  Please ungroup and try again.");
			}
			else if (theObject.typename == "CompoundPathItem") {
				alert("Type Error\nThe selected item is a compound path.  This script can only export path items.  Please release to layers, select the resultant path and try again.");
			}
			else {
				alert("Type Error\nThe selected item is a " + theObject.typename + ", not a path item.  Please select a path item and try again.");
			}
		}
		else {
			if (theObject.closed == true) {
				closedFlag = 1;
			}
			else {
				closedFlag = 0;
			}
			if (theObject.filled == true) {
				fillFlag = 135248;
				if (theObject.fillColor.typename == "CMYKColor") {
					fillRed = 1 - ((theObject.fillColor.cyan/100) * (1 - theObject.fillColor.black/100) + theObject.fillColor.black/100);
					fillGreen = 1 - ((theObject.fillColor.magenta/100) * (1 - theObject.fillColor.black/100) + theObject.fillColor.black/100);
					fillBlue = 1 - ((theObject.fillColor.yellow/100) * (1 - theObject.fillColor.black/100) + theObject.fillColor.black/100);
				}
				else {
					fillRed = theObject.fillColor.red / 255;
					fillGreen = theObject.fillColor.green / 255;
					fillBlue = theObject.fillColor.blue / 255;
				}
			}
			else {
				fillFlag = 168016;
				fillRed = 1;
				fillGreen = 1;
				fillBlue = 1;
			}
			if (theObject.stroked == true) {
				strokeFlag = 135248;
				if (theObject.strokeColor.typename == "CMYKColor") {
					strokeRed = 1 - ((theObject.strokeColor.cyan/100) * (1 - theObject.strokeColor.black/100) + theObject.strokeColor.black/100);
					strokeGreen = 1 - ((theObject.strokeColor.magenta/100) * (1 - theObject.strokeColor.black/100) + theObject.strokeColor.black/100);
					strokeBlue = 1 - ((theObject.strokeColor.yellow/100) * (1 - theObject.strokeColor.black/100) + theObject.strokeColor.black/100);
				}
				else {
					strokeRed = theObject.strokeColor.red / 255;
					strokeGreen = theObject.strokeColor.green / 255;
					strokeBlue = theObject.strokeColor.blue / 255;
				}
				strokeWidth = theObject.strokeWidth + 1;
			}
			else {
				strokeFlag = 168016;
				strokeWidth = 1;
				strokeRed = 1;
				strokeGreen = 1;
				strokeBlue = 1;
			}
			if (theObject.strokeJoin == "StrokeJoin.MITERENDJOIN") {
				strokeType = 0;
			}
			else if (theObject.strokeJoin == "StrokeJoin.ROUNDENDJOIN") {
				strokeType = 1;
			}
			else if (theObject.strokeJoin == "StrokeJoin.BEVELENDJOIN") {
				strokeType = 2;
			}
			xrange = new Array;
			yrange = new Array;
			for (i = 0; i < theObject.pathPoints.length; i++) {
				xrange[i] = theObject.pathPoints[i].anchor[0];
				yrange[i] = theObject.pathPoints[i].anchor[1];
			}
			xrange.sort();
			xmin = xrange[0];
			xmax = xrange.pop();
			xcenter = xmin + (xmax-xmin)/2;
			yrange.sort();
			ymin = yrange[0];
			ymax = yrange.pop();
			ycenter = ymin + (ymax-ymin)/2;
			xlist = new Array();
			ylist = new Array();
			for (i = 0; i < theObject.pathPoints.length; i++) {
				xitem = new Array();
				yitem = new Array();
				xitem[0] = theObject.pathPoints[i].anchor[0] - xcenter;
				xitem[1] = theObject.pathPoints[i].leftDirection[0] - theObject.pathPoints[i].anchor[0];
				xitem[2] = theObject.pathPoints[i].rightDirection[0] - theObject.pathPoints[i].anchor[0];
				xlist[i] = xitem;
				yitem[0] = theObject.pathPoints[i].anchor[1] - ycenter;
				yitem[1] = theObject.pathPoints[i].leftDirection[1] - theObject.pathPoints[i].anchor[1];
				yitem[2] = theObject.pathPoints[i].rightDirection[1] - theObject.pathPoints[i].anchor[1];
				ylist[i] = yitem;
			}
			output = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<!DOCTYPE ozxmlscene>\n\
<ozml version=\"1.0\">\n\
<factory id=\"1\" uuid=\"712462a4323911d78f8400039389b702\">\n\
	<description>Shape</description>\n\
	<manufacturer>Apple</manufacturer>\n\
	<version>1</version>\n\
</factory>\n\
<factory id=\"2\" uuid=\"27f3ee8b229211d7925a00039389b702\">\n\
	<description>Channel</description>\n\
	<manufacturer>Apple</manufacturer>\n\
	<version>1</version>\n\
</factory>\n\
<factory id=\"3\" uuid=\"878a64bd193011d8bac3000a95af9f7e\">\n\
	<description>Channel</description>\n\
	<manufacturer>Apple</manufacturer>\n\
	<version>1</version>\n\
</factory>\n\
<factory id=\"4\" uuid=\"69f1e0a52e7911d8b19a000a95b0025a\">\n\
	<description>Channel</description>\n\
	<manufacturer>Apple</manufacturer>\n\
	<version>1</version>\n\
</factory>\n\
<factory id=\"5\" uuid=\"7644521e2e7911d891a6000a95b0025a\">\n\
	<description>Channel</description>\n\
	<manufacturer>Apple</manufacturer>\n\
	<version>1</version>\n\
</factory>\n\
<factory id=\"6\" uuid=\"10405f52139811d8b4db000a95af9f7e\">\n\
	<description>Channel</description>\n\
	<manufacturer>Apple</manufacturer>\n\
	<version>1</version>\
</factory>\n\
<factory id=\"7\" uuid=\"0e8d443513b611d89395000a95af9f7e\">\n\
	<description>Channel</description>\n\
	<manufacturer>Apple</manufacturer>\n\
	<version>1</version>\n\
</factory>\n\
<primaryObjects>\n\
	<id>10002</id>\n\
</primaryObjects>\n\
<primaryFactories>\n\
	<id>1</id>\n\
</primaryFactories>\n\
<scenenode name=\"Shape\" id=\"10002\" factoryID=\"1\">\n\
	<curve_X>\n";
			for (i = 0; i < xlist.length; i++) {
				output = output + "<vertex index=\"" + i + "\" flags=\"40\">\n\
				<vertex_folder name=\"Vertex\" id=\"" + (i+10) + "\" flags=\"69712\">\n\
					<parameter name=\"Enabled\" id=\"1\" flags=\"65616\" value=\"1\"/>\n\
					<parameter name=\"Value\" id=\"2\" flags=\"65616\" value=\"" + xlist[i][0] + "\"/>\n\
					<parameter name=\"Bias\" id=\"3\" flags=\"65616\" value=\"1\"/>\n\
					<parameter name=\"Input Tangent\" id=\"4\" flags=\"65616\" value=\"" + xlist[i][1] + "\"/>\n\
					<parameter name=\"Output Tangent\" id=\"5\" flags=\"65616\" value=\"" + xlist[i][2] + "\"/>\n\
				</vertex_folder>\n\
			</vertex>\n";
			}
			output = output + "</curve_X>\n\
			<curve_Y>\n";
			for (i = 0; i < ylist.length; i++) {
				output = output + " \
				<vertex index=\"" + i + "\" flags=\"40\">\n\
				<vertex_folder name=\"Vertex\" id=\"" + (i+20) + "\" flags=\"69712\">\n\
					<parameter name=\"Enabled\" id=\"1\" flags=\"65616\" value=\"1\"/>\n\
					<parameter name=\"Value\" id=\"2\" flags=\"65616\" value=\"" + ylist[i][0] + "\"/>\n\
					<parameter name=\"Bias\" id=\"3\" flags=\"65616\" value=\"1\"/>\n\
					<parameter name=\"Input Tangent\" id=\"4\" flags=\"65616\" value=\"" + ylist[i][1] + "\"/>\n\
					<parameter name=\"Output Tangent\" id=\"5\" flags=\"65616\" value=\"" + ylist[i][2] + "\"/>\n\
				</vertex_folder>\n\
			</vertex>\n";
			}
			output = output + "	</curve_Y>\n\
	<override>0</override>\n\
	<aspectRatio>0.9</aspectRatio>\n\
	<ignoreBehaviorsBeforeID>0</ignoreBehaviorsBeforeID>\n\
	<flags>0</flags>\n\
	<timing in=\"0\" out=\"299\" offset=\"0\"/>\n\
	<foldFlags>0</foldFlags>\n\
	<baseFlags>524369</baseFlags>\n\
	<parameter name=\"Object\" id=\"2\" flags=\"4176\">\n\
		<parameter name=\"Shape Animation\" id=\"317\" flags=\"80\" value=\"0\"/>\n\
		<parameter name=\"Shape Type\" id=\"300\" flags=\"65616\" value=\"1\"/>\n\
		<parameter name=\"Closed\" id=\"316\" flags=\"65616\" value=\"" + closedFlag + "\"/>\n\
		<parameter name=\"Fill\" id=\"313\" flags=\"" + fillFlag + "\">\n\
			<parameter name=\"Fill Mode\" id=\"314\" flags=\"65616\" value=\"0\"/>\n\
			<parameter name=\"Fill Color\" id=\"311\" flags=\"4176\">\n\
				<parameter name=\"Red\" id=\"1\" flags=\"80\" value=\"" + fillRed + "\"/>\n\
				<parameter name=\"Green\" id=\"2\" flags=\"80\" value=\"" + fillGreen + "\"/>\n\
				<parameter name=\"Blue\" id=\"3\" flags=\"80\" value=\"" + fillBlue + "\"/>\n\
			</parameter>\n\
		</parameter>\n\
		<parameter name=\"Outline\" id=\"308\" flags=\"" + strokeFlag + "\">\n\
			<parameter name=\"Outline Color\" id=\"307\" flags=\"4176\">\n\
				<parameter name=\"Red\" id=\"1\" flags=\"80\" value=\"" + strokeRed + "\"/>\n\
				<parameter name=\"Green\" id=\"2\" flags=\"80\" value=\"" + strokeGreen + "\"/>\n\
				<parameter name=\"Blue\" id=\"3\" flags=\"80\" value=\"" + strokeBlue + "\"/>\n\
			</parameter>\n\
			<parameter name=\"Width\" id=\"305\" flags=\"80\" value=\"" + strokeWidth + "\"/>\n\
			<parameter name=\"Joint\" id=\"312\" flags=\"65616\" value=\"" + strokeType + "\"/>\n\
			<parameter name=\"Joint\" id=\"319\" flags=\"65618\" value=\"1\"/>\n\
			<parameter name=\"Order\" id=\"306\" flags=\"65616\" value=\"0\"/>\n\
		</parameter>\n\
	</parameter>\n\
</scenenode>\n\
</ozml>";
		//motn_file = File.saveDialog("Select where to save the Motion file");
		motn_file = newFile("Please enter a name for the shape file.  It will be placed on your Desktop.");
		if (motn_file != null) {
			motn_file.open("w", "mofo", "motn");
			motn_file.write(output);
			foo = motn_file.close();
			if (foo == true) {
				alert("Export Successful\nAll done!");
			}
		}
	}
	}
 }      
 else {          
 	alert("You do not have a path object selected.");
 }