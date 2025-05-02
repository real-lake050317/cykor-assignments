CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra

SRCDIR = .
BUILDDIR = build

SRCS = $(wildcard $(SRCDIR)/*.cpp)

OBJS = $(patsubst $(SRCDIR)/%.cpp, $(BUILDDIR)/%.o, $(SRCS))

TARGET = $(BUILDDIR)/main

all: $(TARGET)

$(TARGET): $(OBJS)
	@mkdir -p $(BUILDDIR)
	$(CXX) $(CXXFLAGS) -o $@ $^

$(BUILDDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(BUILDDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

run: $(TARGET)
	./$(TARGET)

clean:
	rm -rf $(BUILDDIR)
