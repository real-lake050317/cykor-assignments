#include <string>

class Directory {
public:
    std::string     dirname;
    Directory*      parent;
    Directory*      subdir;
    Directory*      siblingdir;

    Directory(std::string name);

    void        mkdir(Directory* currentDir, std::string name);
    void        listDir(bool isBackground = false);
    bool        changeDir(Directory*& currentDir, const std::string& name);
    void        printWorkingDir(Directory* currentDir, bool isBackground = false);
    Directory*  findSubdir(std::string name);

private:
protected:
};
