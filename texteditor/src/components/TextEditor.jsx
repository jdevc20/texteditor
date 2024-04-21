import React from 'react';
import './TextEditor.css'

class TextEditor extends React.Component {
    state = {
        color: 'black',
        highlightColor: 'transparent',
        autoColor: false,
        autoHighlight: false
    }

    insertImage = () => {
        var url = prompt("Enter the image URL");
        if (url) {
            document.execCommand('insertImage', false, url);
        }
    }

    insertTable = () => {
        var rows = prompt("Enter number of rows");
        var cols = prompt("Enter number of columns");
        var html = '<table border="1">';
        for (var i = 0; i < rows; i++) {
            html += '<tr>';
            for (var j = 0; j < cols; j++) {
                html += '<td></td>';
            }
            html += '</tr>';
        }
        html += '</table>';
        document.execCommand('insertHTML', false, html);
    }

    handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);

            // Check if the selection is within a list item
            var node = sel.anchorNode;
            while (node !== null && node.nodeName !== 'LI') {
                node = node.parentNode;
            }

            if (node !== null) {
                // The selection is within a list item, indent it
                document.execCommand('indent');
            } else {
                // The selection is not within a list item, insert a tab character
                var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
                range.insertNode(tabNode);

                // Move the caret after the tab character
                range.setStartAfter(tabNode);
                range.setEndAfter(tabNode);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }


    handleColorChange = (e) => {
        this.setState({ color: e.target.value });
        document.execCommand('foreColor', false, e.target.value);
    }

    handleHighlightColorChange = (e) => {
        this.setState({ highlightColor: e.target.value });
        document.execCommand('hiliteColor', false, e.target.value);


    }

    handleColorChange = (e) => {
        this.setState({ color: e.target.value });
        if (this.state.selectedText) {
            document.execCommand('foreColor', false, e.target.value);
        }
    }

    handleHighlightColorChange = (e) => {
        this.setState({ highlightColor: e.target.value });
        document.execCommand('hiliteColor', false, e.target.value);
    }

    handleEditHighlight = () => {
        document.execCommand('hiliteColor', false, this.state.highlightColor);
    }

    handleSelection = () => {
        const selectedText = window.getSelection().toString();
        this.setState({ selectedText });
    }
    handleClear = () => {
        this.setState({ color: 'black', highlightColor: 'transparent' })
    }

    render() {
        return (
            <div className="text-editor" >
                <div>
                    <button className="editor-button" onClick={() => document.execCommand('bold', false, '')}><i className="fa fa-bold" /></button>
                    <button className="editor-button" onClick={() => document.execCommand('italic', false, '')}><i className="fa fa-italic" /></button>
                    <button className="editor-button" onClick={() => document.execCommand('underline', false, '')}><i className="fa fa-underline" /></button>
                    <button className="editor-button" onClick={() => document.execCommand('insertUnorderedList', false, '')}><i className="fa fa-list-ul" /></button>
                    <button className="editor-button" onClick={() => document.execCommand('insertOrderedList', false, '')}><i className="fa fa-list-ol" /></button>
                    <button className="editor-button" onClick={() => document.execCommand('formatBlock', false, 'h1')}><i className="fa fa-header" /></button>
                    <select className="color-picker" value={this.state.color} onChange={this.handleColorChange}>
                        <option value="black">Black</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                    </select>
                    <select className="highlight-picker" value={this.state.highlightColor} onChange={this.handleHighlightColorChange}>
                        <option value="transparent">No Highlight</option>
                        <option value="yellow">Yellow</option>
                        <option value="lightgreen">Light Green</option>
                        <option value="lightblue">Light Blue</option>
                        <option value="lightpink">Light Pink</option>
                    </select>
                    <button onClick={this.handleClear}>Clear</button>

                    <button className="editor-button" onClick={this.insertImage}><i className="fa fa-image" /></button>
                    <button className="editor-button" onClick={this.insertTable}><i className="fa fa-table" /></button>

                </div>
                <div id="editor" className="editor-area" contentEditable
                    onSelect={this.handleSelection}>
                </div>
            </div>
        );
    }
}

export default TextEditor;
