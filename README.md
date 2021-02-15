# UDT to YOLO

Converts files in the [Universal Data Tool format](https://github.com/UniversalDataTool/udt-format) to the
YOLOv1.1 format.

> Note: We do a variation on the YOLO format. Each sample gets it's own subdirectory which is a valid YOLO
> dataset. We may change this in the future.

## Usage

You'll need to have npm installed and ffmpeg installed, then run the command below to
convert the UDT file into the yolo directory.

```
npx udt-to-yolo ./dataset.udt.json -o yolo-dir
```

## YOLOv1.1 Format

> There doesn't seem to be a formal spec for the YOLOv1.1 format, but the directory
> structure is simple enough that we can describe it based on the output of programs
> like CVAT.

The YOLOv1.1 format is a directory organized like this:

```
.
├── obj.data                 ini-like file with dataset stats and paths
├── obj.names                labels, each label has new line
├── train.txt                lists all the images
└── obj_train_data           directory containing images and bounding box txt files
    ├── frame_000000.PNG     image
    ├── frame_000000.txt     bounding boxes for image with same name
    ├── frame_000001.PNG     etc.
    ├── frame_000001.txt
    ├── frame_000002.PNG
    ├── frame_000002.txt
    ├── frame_000003.PNG
    └── frame_000003.txt
```

### obj.data

Contains key-value pairs.

| Key     | Description                                                  |
| ------- | ------------------------------------------------------------ |
| classes | Number of labels                                             |
| train   | path to train.txt (relative to "data", the main directory)   |
| names   | path to label names (relative to "data", the main directory) |
| backup  | ???                                                          |

```
classes = 3
train = data/train.txt
names = data/obj.names
backup = backup/
```

## obj.names

Each label that appears in the dataset.

```
label1
label2
label3
```

## train.txt

Paths to every image frame relative to "data" (main directory).

```
data/obj_train_data/frame_000000.PNG
data/obj_train_data/frame_000001.PNG
data/obj_train_data/frame_000002.PNG
data/obj_train_data/frame_000003.PNG
data/obj_train_data/frame_000004.PNG
data/obj_train_data/frame_000005.PNG
```

## obj_train_data/frame_XXXXXX.PNG

Each frame of the video, or each image of the dataset.


## obj_train_data/frame_XXXXXX.txt

Lists all the bounding boxes of the image. Each line is a bounding box. The line represents
the `<label index (starting at 1)>  <leftmost X position> <topmost Y position> <width> <height>`.

The unit of the X, Y, Width and Height are all fractions of the image. So for example, if you have an
image that is (1000 width, 800 height), and has a bounding box that starts at position (100px from left, 200px from top) with a width of 250 pixels and a height of 300 pixels. Let's say this box uses the second label. You would have the following YOLO line:

`2 0.1 0.25 0.25 0.375`

> Here's the step in-between: `2 100/1000 200/800 250/1000 300/800`

```
1 0.813552 0.562875 0.033875 0.035104
2 0.813552 0.562875 0.033875 0.035104
```


