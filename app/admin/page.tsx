'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaPlus, FaTrash, FaGripVertical } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Photoshoot {
  id: string;
  photographerName: string;
  instagramHandle: string;
  date: string;
  photos: PhotoItem[];
}

interface PhotoItem {
  id: string;
  file: File | null;
  preview: string;
}

export default function AdminPage() {
  // Model Name
  const [modelName, setModelName] = useState('Jana Elise Lister');

  // About Section
  const [aboutContent, setAboutContent] = useState(
    '<p>Based in New Braunfels, TX, I specialize in editorial, commercial, runway, and print modeling. My passion lies in collaborating with other creatives to bring unique ideas to life.</p>'
  );

  // Services Section
  const [servicesContent, setServicesContent] = useState(
    '<h2>Modeling Services: (min. 1 hour)</h2><p><i>I do not shoot any nude or boudoir photography.</i></p><ul><li>Commercial: $120 an hour</li><li>Editorial: $120 an hour</li><li>Swimwear: $100 an hour</li><li>Fitness: $100 an hour</li><li>Bridal: $100 an hour</li><li>Portfolio Building Shoot: $70 an hour</li></ul>'
  );
  const [compCard, setCompCard] = useState<File | null>(null);
  const [compCardPreview, setCompCardPreview] = useState<string>('/img/37B05E61-BA8B-4951-A42D-B97C723AF103.webp');

  // Contact Info
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    instagram: 'jana.listerr',
    location: 'New Braunfels, TX',
  });

  // Photoshoots
  const [photoshoots, setPhotoshoots] = useState<Photoshoot[]>([]);

  // Handle comp card upload
  const handleCompCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompCard(file);
      setCompCardPreview(URL.createObjectURL(file));
    }
  };

  // Add new photoshoot
  const addPhotoshoot = () => {
    const newPhotoshoot: Photoshoot = {
      id: `photoshoot-${Date.now()}`,
      photographerName: '',
      instagramHandle: '',
      date: '',
      photos: [],
    };
    setPhotoshoots([...photoshoots, newPhotoshoot]);
  };

  // Update photoshoot
  const updatePhotoshoot = (id: string, field: keyof Photoshoot, value: string) => {
    setPhotoshoots(photoshoots.map(ps => 
      ps.id === id ? { ...ps, [field]: value } : ps
    ));
  };

  // Delete photoshoot
  const deletePhotoshoot = (id: string) => {
    setPhotoshoots(photoshoots.filter(ps => ps.id !== id));
  };

  // Handle photo upload for photoshoot
  const handlePhotoUpload = (photoshootId: string, files: FileList | null) => {
    if (!files) return;
    
    const newPhotos: PhotoItem[] = Array.from(files).slice(0, 5).map((file, index) => ({
      id: `photo-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotoshoots(photoshoots.map(ps => {
      if (ps.id === photoshootId) {
        const existingPhotos = ps.photos.slice(0, 5 - newPhotos.length);
        return { ...ps, photos: [...existingPhotos, ...newPhotos].slice(0, 5) };
      }
      return ps;
    }));
  };

  // Remove photo from photoshoot
  const removePhoto = (photoshootId: string, photoId: string) => {
    setPhotoshoots(photoshoots.map(ps => {
      if (ps.id === photoshootId) {
        return { ...ps, photos: ps.photos.filter(p => p.id !== photoId) };
      }
      return ps;
    }));
  };

  // Handle drag end for photos
  const handleDragEnd = (photoshootId: string) => (result: DropResult) => {
    if (!result.destination) return;

    setPhotoshoots(photoshoots.map(ps => {
      if (ps.id === photoshootId) {
        const reorderedPhotos = Array.from(ps.photos);
        const [removed] = reorderedPhotos.splice(result.source.index, 1);
        reorderedPhotos.splice(result.destination!.index, 0, removed);
        return { ...ps, photos: reorderedPhotos };
      }
      return ps;
    }));
  };

  // Handle file drop
  const handleDrop = useCallback((photoshootId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handlePhotoUpload(photoshootId, files);
  }, [photoshoots]);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to a database
    console.log({
      modelName,
      aboutContent,
      servicesContent,
      compCard,
      contactInfo,
      photoshoots,
    });
    alert('Settings saved! (In a production app, this would save to a database)');
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <Link href="/" className="admin-back-link">
          <FaArrowLeft /> Back to Site
        </Link>
        <h1>Admin Dashboard</h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        {/* Model Name Section */}
        <section className="admin-section">
          <h2>Model Information</h2>
          <div className="form-group">
            <label htmlFor="modelName">Model Name</label>
            <input
              type="text"
              id="modelName"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Enter model name"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="admin-section">
          <h2>About Section</h2>
          <div className="form-group">
            <label>About Content (WYSIWYG)</label>
            <div className="wysiwyg-container">
              <ReactQuill
                theme="snow"
                value={aboutContent}
                onChange={setAboutContent}
                modules={quillModules}
                placeholder="Write your about section..."
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="admin-section">
          <h2>Services Section</h2>
          <div className="form-group">
            <label>Services Content (WYSIWYG)</label>
            <div className="wysiwyg-container">
              <ReactQuill
                theme="snow"
                value={servicesContent}
                onChange={setServicesContent}
                modules={quillModules}
                placeholder="Write your services..."
              />
            </div>
          </div>
          <div className="form-group">
            <label>Model Composite Card (Comp Card)</label>
            <div className="comp-card-upload">
              {compCardPreview && (
                <div className="comp-card-preview">
                  <Image
                    src={compCardPreview}
                    alt="Comp Card Preview"
                    width={300}
                    height={400}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCompCardUpload}
                id="compCardUpload"
              />
              <label htmlFor="compCardUpload" className="upload-btn">
                Upload Comp Card
              </label>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="admin-section">
          <h2>Contact Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="instagram">Instagram Handle</label>
              <div className="input-with-prefix">
                <span>@</span>
                <input
                  type="text"
                  id="instagram"
                  value={contactInfo.instagram}
                  onChange={(e) => setContactInfo({ ...contactInfo, instagram: e.target.value })}
                  placeholder="username"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={contactInfo.location}
                onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                placeholder="City, State"
              />
            </div>
          </div>
        </section>

        {/* Photoshoot Collections */}
        <section className="admin-section">
          <div className="section-header">
            <h2>Photoshoot Collections</h2>
            <button type="button" className="add-btn" onClick={addPhotoshoot}>
              <FaPlus /> Add Photoshoot
            </button>
          </div>

          {photoshoots.length === 0 ? (
            <p className="empty-message">No photoshoots added yet. Click &quot;Add Photoshoot&quot; to create one.</p>
          ) : (
            <div className="photoshoots-list">
              {photoshoots.map((photoshoot, index) => (
                <div key={photoshoot.id} className="photoshoot-card">
                  <div className="photoshoot-header">
                    <h3>Photoshoot #{index + 1}</h3>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deletePhotoshoot(photoshoot.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Photographer Name</label>
                      <input
                        type="text"
                        value={photoshoot.photographerName}
                        onChange={(e) => updatePhotoshoot(photoshoot.id, 'photographerName', e.target.value)}
                        placeholder="Photographer's name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Instagram Handle</label>
                      <div className="input-with-prefix">
                        <span>@</span>
                        <input
                          type="text"
                          value={photoshoot.instagramHandle}
                          onChange={(e) => updatePhotoshoot(photoshoot.id, 'instagramHandle', e.target.value)}
                          placeholder="photographer_ig"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Photoshoot Date</label>
                      <input
                        type="date"
                        value={photoshoot.date}
                        onChange={(e) => updatePhotoshoot(photoshoot.id, 'date', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Photos (max 5) - Drag to reorder</label>
                    <div
                      className="photo-dropzone"
                      onDrop={handleDrop(photoshoot.id)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      {photoshoot.photos.length < 5 && (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handlePhotoUpload(photoshoot.id, e.target.files)}
                            id={`photos-${photoshoot.id}`}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor={`photos-${photoshoot.id}`} className="dropzone-label">
                            <FaPlus />
                            <span>Drop photos here or click to upload</span>
                            <span className="photo-count">{photoshoot.photos.length}/5 photos</span>
                          </label>
                        </>
                      )}
                    </div>

                    {photoshoot.photos.length > 0 && (
                      <DragDropContext onDragEnd={handleDragEnd(photoshoot.id)}>
                        <Droppable droppableId={photoshoot.id} direction="horizontal">
                          {(provided) => (
                            <div
                              className="photo-grid"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {photoshoot.photos.map((photo, photoIndex) => (
                                <Draggable key={photo.id} draggableId={photo.id} index={photoIndex}>
                                  {(provided, snapshot) => (
                                    <div
                                      className={`photo-item ${snapshot.isDragging ? 'dragging' : ''}`}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                    >
                                      <div className="drag-handle" {...provided.dragHandleProps}>
                                        <FaGripVertical />
                                      </div>
                                      <Image
                                        src={photo.preview}
                                        alt={`Photo ${photoIndex + 1}`}
                                        width={150}
                                        height={150}
                                        style={{ objectFit: 'cover' }}
                                      />
                                      <button
                                        type="button"
                                        className="remove-photo-btn"
                                        onClick={() => removePhoto(photoshoot.id, photo.id)}
                                      >
                                        <FaTrash />
                                      </button>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="form-actions">
          <button type="submit" className="save-btn">Save All Changes</button>
        </div>
      </form>
    </div>
  );
}

