module.exports = Tree;
Tree.Node = Node;

function Tree(rootValue){
    this._root = rootValue ? new Node(rootValue) : null;
    this._size = root ? 1 : 0;
}

Tree.prototype.size = function(){
    return this._size;
};

Tree.prototype.insert = function(value){
    var node = this._root,
        diff;
    if(!this._root){
        this._root = new Node(value);
        this._size++;
        return;
    }
    while(node){
        diff = node.getValue().compare(value);
        if(diff < 0){
            if(node.getRight()){
                node = node.getRight();
            }else{
                this._size++;
                node.setRight(new Node(value, node));
                return true;
            }
        } else if(diff > 0){
            if(node.getLeft()){
                node = node.getLeft();
            }else{
                this._size++;
                node.setLeft(new Node(value, node));
                return true;
            }
        } else if(diff === 0){
            return false;
        }
    }
};

Tree.prototype.remove = function(value, node){
    var node = this.find(value, node), replacer;
    if(!node){
        return false;
    }
    if(node.getLeft() && node.getRight()){
        replacer = this.lowest(node.getRight());
        node.setValue(replacer.getValue());
        this.remove(replacer.getValue(), replacer);
    }else if(node.getRight()){
        replacer = node.getRight();
    }else if(node.getLeft()){
        replacer = node.getLeft();
    }else {
        replacer = null;
    }
    if(!node.getParent()){
        if(replacer){
            replacer.setParent(null);
        }
        this._root = replacer;
    }else{
        node.getParent().replace(node, replacer)
    }
    this._size--;
    return true;
};

Tree.prototype.find = function(value, node){
    var diff;
    node = this.getRoot(node);
    while(node){
        diff = node.getValue().compare(value);
        if(diff < 0){
            node = node.getRight();
        }else if(diff > 0){
            node = node.getLeft();
        }else {
            return node;
        }
    }
    return null;
};

Tree.prototype.lowest = function(node){
    node = this.getRoot(node);
    while(node.getLeft()){
        node = node.getLeft();
    }
    return node;
};

Tree.prototype.highest = function(node){
    node = this.getRoot(node);
    while(node.getRight()){
        node = node.getRight();
    }
    return node;
};

Tree.prototype.getRoot = function(node){
    node = node ? node : this._root;
    if(node == null){
        throw new Error("Empty tree");
    }
    return node;
};


function Node(value, parent){
    this._left = null;
    this._right = null;
    this._value = value;
    this._parent = parent;
}

Node.prototype.getRight = function(){
    return this._right;
};

Node.prototype.getLeft = function(){
    return this._left;
};

Node.prototype.setRight = function(right){
    this._right = right;
};

Node.prototype.setLeft = function(left){
    this._left = left;
};

Node.prototype.setParent = function(parent){
    this._parent = parent;
};

Node.prototype.getParent = function(){
    return this._parent;
};

Node.prototype.replace = function(child, node){
    if(child === this.getRight()){
        this.setRight(node);
        if(node) node.setParent(this);
    }else if(child === this.getLeft()){
        this.setLeft(node);
        if(node) node.setParent(this);
    }
};

Node.prototype.getValue = function(){
    return this._value;
};

Node.prototype.setValue = function(value){
    this._value = value;
};

