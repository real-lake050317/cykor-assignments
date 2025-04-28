class Directory {
    public:
    Directory* parent       = NULL;
    Directory* subdir       = NULL;
    Directory* siblingdir   = NULL;

    std::string dirname;

    Directory(std::string dirname) {
        this->dirname = dirname;
    }

    Directory* findSubdir(std::string dirname) {
        if (subdir == NULL) {
            return NULL;
        }

        if (subdir->dirname == dirname) {
            return subdir;
        } else {
            Directory* temp = subdir;
            while (temp != NULL) {
                if (temp->dirname == dirname) {
                    return temp;
                }
                temp = temp->siblingdir;
            }
            return NULL;
        }
    }

    Directory* findSiblingdir(std::string dirname) {
        if (subdir == NULL) {
            return NULL;
        }

        if (siblingdir->dirname == dirname) {
            return siblingdir;
        } else {
            return siblingdir->findSiblingdir(dirname);
        }
    }

    void mkdir(std::string dirname) {
        if (subdir == NULL) {
            subdir = new Directory(dirname);
        } else {
            Directory* temp = subdir;
            while (temp->siblingdir != NULL) {
                temp = temp->siblingdir;
            }
            temp->siblingdir = new Directory(dirname);
        }
    }
    private:
    protected:
};